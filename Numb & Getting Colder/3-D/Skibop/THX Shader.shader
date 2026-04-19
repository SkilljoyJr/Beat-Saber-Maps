Shader "Custom/THX Shader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Color1 ("Color1", Color) = (1,1,1,0)
        _ColorPos ("ColorPos", Range(0,2)) = 0
        _LightMovement ("LightMovement", Range(-1,1)) = 0



    }
    SubShader
    
    {
        Tags {
            "RenderType"="Opaque"
            
        }

Pass
        {
            Cull Front

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"
            #include "Assets/VivifyTemplate/Utilities/Shader Functions/Math.cginc"
            #include "Assets/CGIncludes/Noise.cginc"
            #include "Assets/CGIncludes/Colors.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                float3 normal : NORMAL;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 normal : TEXCOORD0;
                float2 uv : TEXCOORD1;
                float height : TEXCOORD2;
                float3 worldPosition : TEXCOORD3;
                UNITY_VERTEX_OUTPUT_STEREO

            };

            float _Color1;
            float _ColorPos;
            float _LightMovement;




            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                o.vertex = UnityObjectToClipPos(v.vertex);
                float4 localPos = v.vertex;
                float height = sin(_ColorPos + length(v.vertex.z));
                localPos.y += height;

                o.worldPosition = localToWorld(v.vertex);

                o.normal = v.normal;
                o.uv = v.uv;
                o.height = height;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {

                float t = i.uv.x;
                float4 c = lerp(float4(0,0.6,1,0), _Color1, t) * max(0, i.height);


                float reflect = sampleReflectionProbe(i.normal);
                float noise = simplex(i.worldPosition.y / 20);
                return c - noise - 0.5 + dot(_LightMovement, i.normal);
            }
            ENDCG
        }
    }
}
