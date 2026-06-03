@OnlsLogin @API @Negative

Feature: Create Forgot Password Negative Scenario with Forgot Password API

  @CreateBTAForgotPasswordNegative_001 @Negative
  Scenario Outline: Create BTA Forgot Password with <Case> Username Field
    Given i have "CreateBTAForgotPasswordEndpoint" api request with template "CreateBTAForgotPassword" and following details
      | username | <Username> |
    When i POST "CreateBTAForgotPasswordEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value         |
      | success | false         |
      | message | <Validations> |

    Examples:
      | Username | Validations                                     |
      | abc      | No account found with that username and email   |
      | null     | Validation failed: {username=must not be blank} |
      | Blank    | Validation failed: {username=must not be blank} |

  @CreateBTAForgotPasswordNegative_002 @Negative
  Scenario Outline: Create BTA Forgot Password with <Case> Email Field
    Given i have "CreateBTAForgotPasswordEndpoint" api request with template "CreateBTAForgotPassword" and following details
      | email | <Email> |
    When i POST "CreateBTAForgotPasswordEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value         |
      | success | false         |
      | message | <Validations> |

    Examples:
      | Email | Validations                                     |
      | abc   | Validation failed: {email=must be a well-formed email address}   |
      | null  | Validation failed: {email=must not be blank} |
      | Blank | Validation failed: {email=must not be blank} |