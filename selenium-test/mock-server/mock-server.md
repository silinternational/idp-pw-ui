FORMAT: 1A

# idp-pw-ui Mock API
a simple mock api for idp-pw-ui


# GET /auth/login
+ Response 301 (application/json)
    + Headers
        Location: /#/profile?access_token=abc123


# GET /auth/logout
+ Response 200 (application/json)
    {}


# GET /user/me
+ Response 200 (application/json)
    {
        "first_name": "Lorem",
        "last_name": "Ipsum",
        "idp_username": "username",
        "email": "a@b.com",
        "password_meta": {
            "last_changed": "2016-07-23T17:07:53+00:00",
            "expires": "2017-07-23T17:07:53+00:00"
        }
    }


# POST /reset
+ Request (application/json)
    {
        "username": "lorem_ipsum",
        "verification_token": "03AHJ_Vut4Vyg4lgb3wuUWnFRYx6Xp8lXZ_eOjL-Jo-CRhelpGbhtwDWXUmRlMWFirfrX1tvF_tEDoqFeR2KDszF084rCQTWiJBIZbmB5vAbOT4nPEXMinabykoQ_tKklTDvrd6KWUJPHykIC8DFyQCKb6oFJSINH7HG3r_2lviSVaJRV40DMewXnA-U1jMJluECsugD55RKTVBYC2iCjdOEhvNwJemWWoMlVtQn3rXu4All0sItMYgzsTTssS0EoFASGEPHVTQPDIGLfpwHbIeDCezn6_IV6UVbutWr5f2HrCPQokzofucZHMgNdXwsmEb-K5vKBq_4mnMDJ3m1FeU6bHq0kk0e3sVXad0iaIq7xnI_KC9OUd-uzYlmXPwz60BPVaoyUeLTfDJpZEp4vAg6jM4xcXM1v1VeewSBEdNvBWgb8ZLleCfXTMkfLb-ywmw2ZgLYyg9J4t2xJyL9MUiUezkemHvd9GRzUS3h-ZNa6U6phejreP9NiNdZR4Dm2OtiQyA8kNRp0gVjYJWiZRX1OnsT9hXofNNxPDI3ckI2UhwLQFlCNOPR5sY-frd96AecS6vXIIZL0IK4IMNHxnalrTSmIWS2HiPoK3oM670nFdERTq8nuG5F9dBvQNgT3QvtTMsd17TuGBifka1khRNX_8IFI67htlZZUy2ymcYCtYkIXZnyhvflIT3W0cGLUH6CcmcmCRreiAUvm4yaNpXVtiA4p8eCiyKcx0BRtr_abGxI6xRBDsj3mxWyv2IQqtfIjgTN9vjijG44QKV9sz1g66WxqeP4YYMc46wYoJ3mQcW2pscYu4PjcQNPgtXSzpefz6dC8eBBEqthK6JrJxp-Dn3SkIMRARIqlEm47kG8wtI_w8RVmf-xA"
    }
+ Response 200 (application/json)
    {
      "uid": "QKMQpxYfSm7ZLPt8-0tuK-8CalMcxmcx",
      "methods": [
        {
          "type": "primary",
          "value": "p****_c***a@p******.c**"
        },
        {
          "type": "spouse",
          "value": "d******_*****a@w*******.o**"
        },
        {
          "type": "supervisor",
          "value": "p***_m***x@p**.c**"
        },
        {
          "uid": "fEAzI5tZTBEN9sqNVAvuEDdtTNnqip2s",
          "type": "email",
          "value": "o*************y@c****.c**"
        },
        {
          "uid": "yhjLZVuS7iCZFcsWb00igBftcwRkoYrQ",
          "type": "phone",
          "value": "+1 ########123"
        }
      ]
    }


# GET /password
+ Response 200 (application/json)
    {
      "last_changed": "2016-07-23T17:07:53+00:00",
      "expires": "2017-07-23T17:07:53+00:00"
    }


# PUT /password
+ Request (application/json)
    {
        "password": "phillipL0v3sPuppEE"
    }
+ Response 200 (application/json)
    {
      "last_changed": "2016-07-23T17:07:53+00:00",
      "expires": "2017-07-23T17:07:53+00:00"
    }


# GET /reset/{uid}
+ Response 200 (application/json)
    {
      "uid": "QKMQpxYfSm7ZLPt8-0tuK-8CalMcxmcx",
      "methods": [
        {
          "type": "primary",
          "value": "p****_c***a@p******.c**"
        },
        {
          "type": "spouse",
          "value": "d******_*****a@w*******.o**"
        },
        {
          "type": "supervisor",
          "value": "p***_m***x@p**.c**"
        },
        {
          "uid": "fEAzI5tZTBEN9sqNVAvuEDdtTNnqip2s",
          "type": "email",
          "value": "o*************y@c****.c**"
        },
        {
          "uid": "yhjLZVuS7iCZFcsWb00igBftcwRkoYrQ",
          "type": "phone",
          "value": "+1 ########123"
        }
      ]
    }


# PUT /reset/{uid}
+ Request (application/json)
    {
        "uid": "awf45fae56gsr6hwa4g6h",
        "type": "phone",
        "value": "###-###-4567"
    }
+ Response 200 (application/json)
    {
      "uid": "QKMQpxYfSm7ZLPt8-0tuK-8CalMcxmcx",
      "methods": [
        {
          "type": "primary",
          "value": "p****_c***a@p******.c**"
        },
        {
          "type": "spouse",
          "value": "d******_*****a@w*******.o**"
        },
        {
          "type": "supervisor",
          "value": "p***_m***x@p**.c**"
        },
        {
          "uid": "fEAzI5tZTBEN9sqNVAvuEDdtTNnqip2s",
          "type": "email",
          "value": "o*************y@c****.c**"
        },
        {
          "uid": "yhjLZVuS7iCZFcsWb00igBftcwRkoYrQ",
          "type": "phone",
          "value": "+1 ########123"
        }
      ]
    }


# PUT /reset/{uid}/resend
+ Request (application/json)
    {}
+ Response 200 (application/json)
    {
      "uid": "QKMQpxYfSm7ZLPt8-0tuK-8CalMcxmcx",
      "methods": [
        {
          "type": "primary",
          "value": "p****_c***a@p******.c**"
        },
        {
          "type": "spouse",
          "value": "d******_*****a@w*******.o**"
        },
        {
          "type": "supervisor",
          "value": "p***_m***x@p**.c**"
        },
        {
          "uid": "fEAzI5tZTBEN9sqNVAvuEDdtTNnqip2s",
          "type": "email",
          "value": "o*************y@c****.c**"
        },
        {
          "uid": "yhjLZVuS7iCZFcsWb00igBftcwRkoYrQ",
          "type": "phone",
          "value": "+1 ########123"
        }
      ]
    }


# PUT /reset/{uid}/validate
+ Request (application/json)
    {
        "code": 1234, 
        "client_id": "some random string"
    }
+ Response 200 (application/json)
    {
      "access_token": "DlvP8VRwiIsF78jGUO946ohzinmqBfme"
    }


# GET /method
+ Response 200 (application/json)
    [
      {
        "id": "asdfvavcaga4a4f4wfgvba4va",
        "type": "email",
        "value": "pepsi.cola@personal.com"
      },
      {
        "id": "G1d-afbg5shh5revsz56b6jth6hnnh",
        "type": "phone",
        "value": "1,7045551212"
      },
      {
        "type": "primary",
        "value": "pepsi_cola@pepsico.org"
      }
    ]


# GET /method/{id}
+ Response 200 (application/json)
    {}


# POST /method
+ Request (application/json)
    {
        "type": "email",
        "value": "shep@gmail.com"
    }
+ Response 200 (application/json)
    {
      "id": "HjklnW4bXeejKweoOojEeju6a5nLLdHs",
      "type": "email",
      "value": "antoheremail@pepsico.com"
    }

# PUT /method/{id}
+ Request (application/json)
    {
        "code": 1234 
    }
+ Response 200 (application/json)
    {
      "id": "HjklnW4bXeejKweoOojEeju6a5nLLdHs",
      "type": "email",
      "value": "phillip@fillup.io"
    }


# PUT /method/{id}/resend
+ Request (application/json)
    {}
+ Response 200 (application/json)
    {}


# DELETE /method/{id}
+ Request (application/json)
    {}
+ Response 200 (application/json)
    {}


# GET /config
+ Response 200 (application/json)
    {
      "idpName": "ACME Inc",
      "idpUsernameHint": "Acme username, ex: first_last",
      "support": {
        "email": "info@acmeinc.org"
      },
      "password": {
        "minLength": {
          "value": 10,
          "pattern": ".{10,}"
        },
        "maxLength": {
          "value": 255,
          "pattern": ".{0,255}"
        },
        "minNum": {
          "value": 2,
          "pattern": "([0-9].*){2,}"
        },
        "zxcvbn": {
          "minScore": 2
        }
      }
    }