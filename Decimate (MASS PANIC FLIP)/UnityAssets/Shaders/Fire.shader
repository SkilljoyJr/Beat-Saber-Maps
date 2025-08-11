Shader "Custom/Fire"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _OutColor ("OutColor", Color) = (1,1,1)
        _InColor ("InColor", Color) = (1,1,1)
        _Brightness ("Brightness", Range(0,1)) = 1
    }
    SubShader
    {
        Tags {
            "RenderType"="Transparent"
            "Queue"="Transparent"
        }

        ZWrite Off
        Blend One OneMinusSrcColor

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            // VivifyTemplate Libraries
            #include "Assets/VivifyTemplate/Utilities/Shader Functions/Noise.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Colors.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Math.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Easings.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float4 texcoord0 : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
                float random : TEXCOORD1;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float3 _OutColor;
            float3 _InColor;

            float3 fireGradient(float t)
            {
                float3 col = lerp(_OutColor, _InColor, (t - 0.2) * 2);
                return col *= min(t, 1) * 0.5;
            }

            float _Brightness;


            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.texcoord0.xy, _MainTex);
                o.random = v.texcoord0.z;

                return o;
            }

            float smoothEdge(float x, float h)
            {
                float d = x - 0.5;
                float d2 = d*d;
                return 1 - pow(d2 * 4, h);
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float2 pos = i.uv + i.random * 3;

                float n = simplex(pos * 2 + float2(0, -_Time.y));
                float v = simplex(n * 0.2*5 + pos * 2 + float2(0, -_Time.y * 10)) * 0.5 + 0.3;

                float2 centerUV = i.uv * 2 - 1;
                float flame = smoothEdge(i.uv.x, 1) * 0.9 - i.uv.y + i.uv.x * 0.2;

                v -= (1 - flame) * 0.5;
                v = max(v, 0);
                v *= min(1, i.uv.y * 4);

                float circle = 1 - length(centerUV*3);
                float mask = pow(circle + 2, 1);

                float3 col = fireGradient(v * 10);
                col *= mask;

                return float4(col * _Brightness, v * v * v);
            }
            ENDCG
        }
    }
}


//Pre-unfucked working fire shader
/*
Shader "Custom/Fire"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _OutColor ("OutColor", Color) = (1,1,1)
        _InColor ("InColor", Color) = (1,1,1)
    }
    SubShader
    {
        Tags {
            "RenderType"="Transparent"
            "Queue"="Transparent"
        }

        ZWrite Off
        Blend One OneMinusSrcColor

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            // VivifyTemplate Libraries
            #include "Assets/VivifyTemplate/Utilities/Shader Functions/Noise.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Colors.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Math.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Easings.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float4 texcoord0 : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
                float random : TEXCOORD1;
                UNITY_VERTEX_OUTPUT_STEREO
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float3 _OutColor;
            float3 _InColor;

            float3 fireGradient(float t)
            {
                float3 col = lerp(_OutColor, _InColor, (t - 0.2) * 2);
                return col *= min(t, 1) * 0.5;
            }

            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o)

                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.texcoord0.xy, _MainTex);
                o.random = v.texcoord0.z;

                return o;
            }

            float smoothEdge(float x, float h)
            {
                float d = x - 0.5;
                float d2 = d*d;
                return 1 - pow(d2 * 4, h);
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float2 pos = i.uv + i.random * 3;

                float n = simplex(pos * 2 + float2(0, -_Time.y));
                float v = simplex(n * 0.2 + pos * 2 + float2(0, -_Time.y * 2)) * 0.5 + 0.3;

                float2 centerUV = i.uv * 2 - 1;
                float flame = smoothEdge(i.uv.x, 1) * 0.9 - i.uv.y;

                v -= (1 - flame) * 0.5;
                v = max(v, 0);
                v *= min(1, i.uv.y * 4);

                float circle = 1 - length(centerUV);
                float mask = pow(circle + 2, 1);

                float3 col = fireGradient(v * 10);
                col *= mask;

                return float4(col, v * v * v);
            }
            ENDCG
        }
    }
}
*/