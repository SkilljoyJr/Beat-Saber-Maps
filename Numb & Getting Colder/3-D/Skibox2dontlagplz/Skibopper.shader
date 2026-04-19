Shader "Custom/Skibopper"

{

    Properties

    {

        _MainTex ("Texture (PNG)", 2D) = "white" {}

        _EmissionStrength ("Emission Strength", Range(0, 5)) = 1.0

        _Alpha ("Alpha Override", Range(0, 1)) = 0.0

    }

    SubShader

    {

        // Set tags for transparency

        Tags {

            "Queue"="Transparent"

            "RenderType"="Transparent"

        }



        // Cull Front: Renders only the back faces

        Cull Front

        // Standard Alpha Blending

        ZWrite Off



        Pass

        {

            CGPROGRAM

            #pragma vertex vert

            #pragma fragment frag



            #include "UnityCG.cginc"



            struct appdata

            {

                float4 vertex : POSITION;

                float2 uv : TEXCOORD0; // Added UVs for the texture

                UNITY_VERTEX_INPUT_INSTANCE_ID

            };



            struct v2f

            {

                float4 vertex : SV_POSITION;

                float2 uv : TEXCOORD0;

                UNITY_VERTEX_OUTPUT_STEREO

            };



            sampler2D _MainTex;

            float4 _MainTex_ST;

            float _EmissionStrength;

            float _Alpha;



            v2f vert (appdata v)

            {

                v2f o;

                UNITY_SETUP_INSTANCE_ID(v);

                UNITY_INITIALIZE_OUTPUT(v2f, o);

                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);



                o.vertex = UnityObjectToClipPos(v.vertex);

                o.uv = TRANSFORM_TEX(v.uv, _MainTex);

                return o;

            }



            fixed4 frag (v2f i) : SV_Target

            {

                // Sample the texture

                fixed4 col = tex2D(_MainTex, i.uv);

               

                // Apply brightness to the RGB channels

                col.rgb *= _EmissionStrength;

               

                // Set alpha to 0 (or use the slider)

                col.a = _Alpha;

               

                return col;

            }

            ENDCG
        }
    }
}