Shader "Custom/LakeRefractionDarknessMasked"
{
    Properties
    {
        _Distortion ("Distortion Strength", Float) = 0.03
        _WaveScale ("Wave Scale", Float) = 8
        _WaveSpeed ("Wave Speed", Float) = 0.4

        _MaskTex ("Mask Texture", 2D) = "white" {}
    }

    SubShader
    {
        Tags
        {
            "RenderType"="Transparent"
            "Queue"="Transparent"
        }

        GrabPass { "_GrabTexture" }

        ZWrite Off
        Blend Zero SrcColor

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
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                float4 screenPos : TEXCOORD1;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            UNITY_DECLARE_SCREENSPACE_TEXTURE(_GrabTexture);
            sampler2D _MaskTex;

            float _Distortion;
            float _WaveScale;
            float _WaveSpeed;

            v2f vert (appdata v)
            {
                v2f o;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.screenPos = ComputeGrabScreenPos(o.vertex);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);

                float2 screenUV = i.screenPos.xy / i.screenPos.w;

                float time = _Time.y * _WaveSpeed;

                float wave1 = sin((i.uv.x + time) * _WaveScale);
                float wave2 = cos((i.uv.y + time * 0.7) * _WaveScale * 0.9);

                float2 distortion = float2(wave1, wave2) * _Distortion;
                screenUV += distortion;

                fixed4 grabCol =
                    UNITY_SAMPLE_SCREENSPACE_TEXTURE(_GrabTexture, screenUV);

                // Texture mask (grayscale)
                float mask = tex2D(_MaskTex, i.uv).r;

                return grabCol * mask;
            }
            ENDCG
        }
    }
}
