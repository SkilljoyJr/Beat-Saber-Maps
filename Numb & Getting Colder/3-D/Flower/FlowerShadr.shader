Shader "Custom/SimpleTranslucent_VR_Optimized"
{
    Properties
    {
        _SimpleInnerColor ("Inner Color", Color) = (1, 0.4, 0.2, 0)
        _SimpleOuterColor ("Outer Color", Color) = (1, 1, 1, 1) // Set Alpha to 1 for visibility
        _ShadowStrength ("Shadow Strength", Range(0, 2)) = 1
        _AmbientStrength ("Ambient Strength", Range(0, 1)) = 0.3
        _GradientStartX ("Gradient Start X (Local)", Float) = 0
        _GradientEndX ("Gradient End X (Local)", Float) = 5
        _Flutter ("Flutter Intensity", Range(0, 1)) = 0.5
        _FlutterSpeed ("Flutter Speed", Range(0.1, 10)) = 1
        _RippleSize ("Ripple Size", Range(0.1, 10)) = 2
        _SoftEdgeStrength ("Soft Edge Strength", Range(0, 1)) = 0.5

    }

    SubShader
    {
        // VR Optimization: Transparent Queue, but ZWrite Off is usually preferred 
        // for simple glass to avoid sorting artifacts.
        Tags { "RenderType"="Transparent" "Queue"="Transparent" "IgnoreProjector"="True" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite On
        Cull Back

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            // Removed Noise.cginc to use a cheaper sine-based ripple for VR performance
            // If Voronoi is strictly required, keep the include but it hits frame rates.

            half4 _SimpleInnerColor, _SimpleOuterColor;
            half _ShadowStrength, _AmbientStrength;
            float _GradientStartX, _GradientEndX;
            half _SoftEdgeStrength;
            half _Flutter, _FlutterSpeed, _RippleSize;

            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                half4 color : TEXCOORD0; // Combined shaded color and alpha
                half3 viewDir : TEXCOORD1;
                half3 worldNormal : TEXCOORD2;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            v2f vert(appdata v)
            {
                v2f o;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.pos = UnityObjectToClipPos(v.vertex);
                
                // 1. Calculate Local Gradient
                float diff = max(_GradientEndX - _GradientStartX, 0.0001);
                float t = saturate((v.vertex.y - _GradientStartX) / diff);
                half3 baseColor = lerp(_SimpleInnerColor.rgb, _SimpleOuterColor.rgb, t);

                // 2. Cheap Flutter Ripple (Sin instead of Voronoi for VR)
                float phase = (-v.vertex.y / max(_RippleSize, 0.001)) + (_Time.y * _FlutterSpeed);
                half wave = sin(phase * 6.2831);
                half flutterValue = lerp(1.0, 0.5 + 0.5 * wave, _Flutter);

                // 3. Simple Vertex Lighting
                float3 worldNormal = UnityObjectToWorldNormal(v.normal);
                float3 lightDir = normalize(_WorldSpaceLightPos0.xyz);
                half NdotL = saturate(dot(worldNormal, lightDir));
                half shadow = lerp(_AmbientStrength, 1.0, NdotL);

                // 4. Combine into a single vertex color attribute
                o.color.rgb = baseColor * shadow * _ShadowStrength * flutterValue;
                o.color.a = _SimpleOuterColor.a * shadow * _ShadowStrength;
                
                // Pass data for Fresnel (Soft Edge)
                o.worldNormal = worldNormal;
                o.viewDir = normalize(UnityWorldSpaceViewDir(mul(unity_ObjectToWorld, v.vertex)));

                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                // Fresnel / Soft Edge (Calculated per pixel for visual quality)
                // Using half precision for VR speed
                half fresnel = 1.0 - saturate(dot(normalize(i.viewDir), normalize(i.worldNormal)));
                half edgeFade = lerp(1.0, fresnel * fresnel, _SoftEdgeStrength);

                // Final Output: Multiply vertex-calculated lighting/color by pixel-calculated edge fade
                return fixed4(i.color.rgb * edgeFade, i.color.a * edgeFade);
            }
            ENDCG
        }
    }
    FallBack "Transparent/VertexLit"
}