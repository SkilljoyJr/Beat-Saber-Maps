Shader "Custom/kickwow"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Intensity ("Intensity", Range(0, 2)) = 1
        _Color ("Color", Color) = (1, 1, 1, 1)
        _CenterFalloff ("Center Falloff", Range(0, 5)) = 1
        _CenterX ("Center X", Range(0, 1)) = 0.5
        _CenterY ("Center Y", Range(0, 1)) = 0.5
    }
    SubShader
    {
        Cull Off
        ZWrite Off
        ZTest Always

        Pass
        {
            CGPROGRAM
            
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            float _Intensity;
            float _CenterFalloff;
            float _CenterX;
            float _CenterY;
            float4 _Color;
            float4 _MainTex_ST;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
                
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;

                return o;
            }
            
            float rand(float2 co)
            {
                return frac(sin(dot(co, float2(12.9898, 78.233))) * 43758.5453);
            }

            UNITY_DECLARE_SCREENSPACE_TEXTURE(_MainTex);

            float4 frag (v2f i) : SV_TARGET {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);

                float2 uv = UnityStereoTransformScreenSpaceTex(i.uv);

                // Center position controlled by properties (normalized UV)
                float2 center = float2(_CenterX, _CenterY);

                // Distance from shifted center
                float dist = distance(uv, center);

                // Falloff mask
                float falloff = saturate(pow(dist * 2, _CenterFalloff));

                float t = uv.x; // use both axes for variation
                float r = rand(float2(t, t));

                // Apply reduced intensity based on falloff
                float effectiveIntensity = _Intensity * falloff;

                uv.x -= (r / 30) * effectiveIntensity * 4 * pow(t, 2);
                uv.x += (r / 30) * effectiveIntensity;

                return UNITY_SAMPLE_SCREENSPACE_TEXTURE(_MainTex, uv) * _Color;
            }

            ENDCG
        }
    }
}
