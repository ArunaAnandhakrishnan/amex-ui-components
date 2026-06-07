@BTAChangePassword @API @Negative

Feature: Create BTA Change Password Negative Scenario with Change Password API

  Background:
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration"
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "201"
    And i have following values from the transaction
      | locator       | varname   |
      | data.username | #UserName |
    Given i have "BTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | #UserName |
      | password | Test@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And i have following values from the transaction
      | locator          | varname      |
      | data.accessToken | #AccessToken |

  @BTAChangePassword
  Scenario Outline: User Create BTA Change Password with <Case> CurrentPassword Field
    Given i have "CreateChangePasswordEndpoint" api request with template "CreateChangePassword" and following details
      | currentPassword | <CurrentPassword> |
      | newPassword     | Test@12345        |
    When i POST "CreateChangePasswordEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value      |
      | success | false      |
      | message | <Response> |

    Examples:
      | Case                     | CurrentPassword | Response                                               |
      | Blank Current Password   | Blank           | Validation failed: {currentPassword=must not be blank} |
      | Invalid Current Password | Invalid@123     | Current password is incorrect                          |
      | Null Current Password    | null            | Validation failed: {currentPassword=must not be blank} |

  @BTAChangePassword
  Scenario Outline: User Create BTA Change Password with <Case> newPassword Field
    Given i have "CreateChangePasswordEndpoint" api request with template "CreateChangePassword" and following details
      | currentPassword | Test@1234     |
      | newPassword     | <NewPassword> |
    When i POST "CreateChangePasswordEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                              |
      | success | false                                              |
      | message | <Response> |

    Examples:
      | Case               | NewPassword |Response|
      | Blank New Password | Blank       | Validation failed: {newPassword=size must be between 8 and 100}       |
      | Null New Password  | null        | Validation failed: {newPassword=must not be null} |