Shader "Custom/Retro"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}

        _ScanlineIntensity ("Scanline Intensity", Range(0, 1)) = 0.3
        _ScanlineDensity ("Scanline Density", Range(100, 2000)) = 800

        _VignetteIntensity ("Vignette Intensity", Range(0, 1)) = 0.35
        _VignetteSmoothness ("Vignette Smoothness", Range(0.1, 1)) = 0.6

        _ChromaticAberration ("Chromatic Aberration", Range(0, 2)) = 0.5
        _Pixelation ("Pixelation", Range(1, 5000)) = 360

        _ColorDepth ("Color Depth (Quantization)", Range(2, 500)) = 8
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

            float _ScanlineIntensity;
            float _ScanlineDensity;
            float _VignetteIntensity;
            float _VignetteSmoothness;
            float _ChromaticAberration;
            float _Pixelation;
            float _ColorDepth;

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

                // Pixelation: explicit float2 for pixel size
                float invPixel = 1.0 / max(1.0, _Pixelation); // guard against zero
                float2 pixelSize = float2(invPixel, invPixel);
                float2 uvPix = floor(i.uv / pixelSize) * pixelSize;

                // Chromatic aberration: scalar then build float2 when sampling
                float ca = _ChromaticAberration * 0.001; // small normalized offset
                float3 col;
                col.r = getScreenCol(uvPix + float2(ca, 0.0)).r;
                col.g = getScreenCol(uvPix).g;
                col.b = getScreenCol(uvPix - float2(ca, 0.0)).b;

                // Scanlines (use uvPix.y so pixelation keeps lines coherent)
                float scan = sin(uvPix.y * _ScanlineDensity) * 0.5 + 0.5;
                col *= (1.0 - _ScanlineIntensity * (1.0 - scan));

                // Vignette
                float2 centered = i.uv - 0.5;
                float dist = length(centered);
                // compute a smooth vignette falloff
                float vignette = smoothstep(0.5, _VignetteSmoothness + 0.5, dist * (1.0 + _VignetteIntensity * 2.0));
                col *= (1.0 - _VignetteIntensity * vignette);

                // Color quantization
                float depth = max(1.0, _ColorDepth);
                col = floor(col * depth) / depth;

                return float4(col, 1.0);
            }
            ENDCG
        }
    }
}
