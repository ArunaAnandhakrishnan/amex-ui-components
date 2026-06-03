@OnlsLogin @API @Positive

Feature: Create Forgot Password Positive Scenario with Forgot Password API

  @CreateBTAForgotPassword @Sanity
  Scenario: Create BTA Forgot Password
    Given i have "CreateBTAForgotPasswordEndpoint" api request with template "CreateBTAForgotPassword" and following details
      | username | corp.user                  |
      | email    | surya.prakash@verinite.com |
    When i POST "CreateBTAForgotPasswordEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value                                 |
      | success           | true                                  |
      | message           | Temporary password sent to your email |