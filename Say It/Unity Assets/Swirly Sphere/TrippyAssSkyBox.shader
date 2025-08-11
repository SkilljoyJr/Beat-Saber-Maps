Shader "Custom/MySky"
{
    Properties
    {
        _Brightness ("Brightness", Range(0,1)) = 1
        _Twist ("Twist", Range(0,10)) = 1
        _tanPos ("tanPos", Range(0,10)) = 1
        _yRotate ("*yRotate", Range(-1,1)) = 1
        _xRotate ("*xRotate", Range(-1,1)) = 1
        _Hue1 ("Hue1", Range(0,1)) = 1
        _Hue2 ("Hue2", Range(0,1)) = 1
        _cShift ("cShift", Range(0,1)) = 1
        _angle2 ("angle2", Range (0,10)) = 1
        _angle3 ("angle3", Range (0,10)) = 1
        _powNuller ("powNuller", Range (0,1)) = 1
        _spiral2Coeff ("spiral2Coeff",Range (0,1)) = 1
        _spiral3Coeff ("spiral2Coeff",Range (0,1)) = 1



    }
    SubShader
    {
        Tags {
            "RenderType"="Transparent"
        }
        Cull Front

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            // VivifyTemplate Libraries
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Noise.cginc"
            #include "Assets/VivifyTemplate/Utilities/Shader Functions/Colors.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Math.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Easings.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 localPos : TEXCOORD0;
                UNITY_VERTEX_OUTPUT_STEREO
            };
            float _Hue1;
            float _Hue2;
            float _cShift;


            float3 galaxyColor(float t)
            {
                return palette(t, 0.5, 0.5, 1, float3(0, _Hue1, _Hue2));
            }

            float _Brightness;
            float _Twist;
            float _tanPos;
            float _yRotate;
            float _xRotate;
            float _angle2;
            float _angle3;
            float _powNuller;
            float _spiral2Coeff;
            float _spiral3Coeff;


            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                float3 localPos = v.vertex;
                o.vertex = UnityObjectToClipPos(localPos);
                o.localPos = localPos;

                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float2 xyPlane = i.localPos.xy;
                float dist = length(xyPlane.x*0.1);
                float angle = atan2(xyPlane.y*_yRotate, xyPlane.x*_xRotate);
                float normalizedAngle = angle / (2 * UNITY_PI) + 0.5;

                float angle1 = normalizedAngle + (i.localPos.x + tan(_tanPos/5 + dist * 10) * 0.4) * _Twist;
                angle1 -= pow(lerp(length(xyPlane), UNITY_PI, _Twist*2), _powNuller);
                float3 spiral1 = galaxyColor(angle1 * 2);
                spiral1 = pow(spiral1, 5);

                float angle2 = normalizedAngle + (i.localPos.z + sin(_Time.y/2 + dist * 5) * 0.003) * _Twist;
                float3 spiral2 = galaxyColor(angle2 * _angle2);
                spiral2 = pow(spiral2, 5);

                float angle3 = normalizedAngle + (i.localPos.y*0.5 + sin(_Time.y/2 + dist * 10) * 0.1) * _Twist;
                float3 spiral3 = galaxyColor(angle3 * _angle3);
                spiral3 = pow(spiral3, 5);


                float3 col = spiral1 + spiral2 * _spiral2Coeff + spiral3 * _spiral3Coeff;


                return float4(col * _Brightness, 0);
            }
            ENDCG
        }
    }
}


/*
Shader "Custom/MySky"
{
    Properties
    {
        _Brightness ("Brightness", Range(0,1)) = 1
        _Twist ("Twist", Range(0,10)) = 1
        _tanPos ("tanPos", Range(0,10)) = 1
        _yRotate ("*yRotate", Range(-1,1)) = 1
        _xRotate ("*xRotate", Range(-1,1)) = 1
        _Hue1 ("Hue1", Range(0,1)) = 1
        _Hue2 ("Hue2", Range(0,1)) = 1
        _cShift ("cShift", Range(0,1)) = 1



    }
    SubShader
    {
        Tags {
            "RenderType"="Transparent"
        }
        Cull Front

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            // VivifyTemplate Libraries
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Noise.cginc"
            #include "Assets/VivifyTemplate/Utilities/Shader Functions/Colors.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Math.cginc"
            // #include "Assets/VivifyTemplate/Utilities/Shader Functions/Easings.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 localPos : TEXCOORD0;
                UNITY_VERTEX_OUTPUT_STEREO
            };
            float _Hue1;
            float _Hue2;
            float _cShift;


            float3 galaxyColor(float t)
            {
                return palette(t, 0.5, 0.5, _cShift, float3(0, _Hue1, _Hue2));
            }

            float _Brightness;
            float _Twist;
            float _tanPos;
            float _yRotate;
            float _xRotate;


            v2f vert (appdata v)
            {
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_INITIALIZE_OUTPUT(v2f, v2f o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                float3 localPos = v.vertex;
                o.vertex = UnityObjectToClipPos(localPos);
                o.localPos = localPos;

                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float2 xyPlane = i.localPos.xy;
                float dist = length(xyPlane.x*0.1);
                float angle = atan2(xyPlane.y*_yRotate, xyPlane.x*_xRotate);
                float normalizedAngle = angle / (2 * UNITY_PI) + 0.5;

                float angle1 = normalizedAngle + (i.localPos.x + tan(_tanPos/5 + dist * 10) * 0.7) * _Twist;
                float3 spiral1 = galaxyColor(angle1 * 2);
                spiral1 = pow(spiral1, 5);

                float angle2 = normalizedAngle + (i.localPos.z + sin(_Time.y*2 + dist * 9) * 0.01) * _Twist;
                float3 spiral2 = galaxyColor(angle2 * 1.5);
                spiral2 = pow(spiral2, 5);

                float angle3 = normalizedAngle + (i.localPos.y*0.5 + sin(_Time.y*-2 + dist * 2000) * 0.01) * _Twist;
                float3 spiral3 = galaxyColor(angle3 * 2);
                spiral3 = pow(spiral3, 5);


                float3 col = spiral1 + spiral2 + spiral3;


                return float4(col * _Brightness, 0);
            }
            ENDCG
        }
    }
}
*/