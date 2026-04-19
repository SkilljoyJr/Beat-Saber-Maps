Shader "Swifter/VFX/WaterRipple"
{
    Properties
    {
        _Distortion ("Distortion Strength", Float) = 0.05
        _RippleFrequency ("Ripple Frequency", Float) = 6
        _RippleSpeed ("Ripple Speed", Float) = 1
        _Falloff ("Falloff", Float) = 2
    }

    SubShader
    {
        Tags
        {
            "RenderType"="Transparent"
            "Queue"="Transparent"
        }

        GrabPass { "_GrabTexture1" }
        ZWrite Off
        Blend SrcAlpha OneMinusSrcAlpha

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float4 color : COLOR;
                float4 texcoord0 : TEXCOORD0;
                float4 texcoord1 : TEXCOORD1;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 worldPos : TEXCOORD0;
                float3 center : TEXCOORD1;
                float2 uv : TEXCOORD2;
                float strength : TEXCOORD3;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            UNITY_DECLARE_SCREENSPACE_TEXTURE(_GrabTexture1);

            float _Distortion;
            float _RippleFrequency;
            float _RippleSpeed;
            float _Falloff;

            v2f vert (appdata v)
            {
                v2f o;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.vertex = UnityObjectToClipPos(v.vertex);

                o.worldPos = v.vertex.xyz;
                o.center = v.texcoord0.xyz;
                o.uv = float2(v.texcoord0.w, v.texcoord1.x);
                o.strength = v.color.x;

                return o;
            }

            float2 worldToScreen(float3 pos)
            {
                float4 clip = ComputeGrabScreenPos(UnityWorldToClipPos(pos));
                return clip.xy / clip.w;
            }

            float4 sampleScreen(float2 screenUV)
            {
                return UNITY_SAMPLE_SCREENSPACE_TEXTURE(_GrabTexture1, screenUV);
            }

            fixed4 frag (v2f i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);

                float2 dir = i.worldPos.xz - i.center.xz;
                float dist = length(dir) + 1e-4;

                dir /= dist;

                // Gentle ripple wave
                float wave =
                    sin(dist * _RippleFrequency - _Time.y * _RippleSpeed);

                // Smooth attenuation
                float attenuation = exp(-dist * _Falloff);

                float ripple = wave * attenuation * _Distortion * i.strength;

                float3 offsetPos =
                    i.worldPos + float3(dir.x, 0, dir.y) * ripple;

                float2 screenUV = worldToScreen(offsetPos);

                return sampleScreen(screenUV);
            }
            ENDCG
        }
    }
}
