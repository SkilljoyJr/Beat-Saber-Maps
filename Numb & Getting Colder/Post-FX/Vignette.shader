Shader "Custom/Vignette"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _VignetteRadius ("Vignette Radius", Range(0.0, 1.0)) = 0.5
        _VignetteFeather ("Vignette Feather", Range(0.001, 1.0)) = 0.25
        _VignetteOpacity ("Vignette Opacity", Range(0.0, 1.0)) = 0.8
    }
    SubShader
    {
        Cull Off ZWrite Off ZTest Always

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            UNITY_DECLARE_SCREENSPACE_TEXTURE(_MainTex);

            float _VignetteRadius;
            float _VignetteFeather;
            float _VignetteOpacity;

            v2f vert (appdata v)
            {
                v2f o;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }

            float4 getScreenCol(float2 uv)
            {
                return UNITY_SAMPLE_SCREENSPACE_TEXTURE(_MainTex, UnityStereoTransformScreenSpaceTex(uv));
            }

            fixed4 frag (v2f i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);

                float4 col = getScreenCol(i.uv);

                // Centered UV (0,0 at center)
                float2 centeredUV = i.uv - 0.5;

                // Distance from center (normalized to corner distance)
                float dist = length(centeredUV) / 0.7071;

                // Smoothstep mask (but inverted)
                float vignette = 1.0 - smoothstep(_VignetteRadius, _VignetteRadius - _VignetteFeather, dist);

                // Apply opacity
                vignette *= _VignetteOpacity;

                // Darken towards the CENTER now (inverse vignette)
                col.rgb *= (1.0 - vignette);

                return col;
            }
            ENDCG
        }
    }
}
