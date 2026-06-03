@OnlsLogin @API @Positive

Feature: Create BTA Role Based Login Positive Scenario with Login API

  @CreateBTALogin @Sanity
  Scenario: Create Amex BTA Corporate Master Admin Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.admin |
      | password | Corp@1234  |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity
  Scenario: Create Amex BTA Corporate Sub Admin Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.sub.admin |
      | password | Corp@1234      |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity @WIP
  Scenario: Create Amex BTA Corporate User Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.user |
      | password | Corp@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity
  Scenario: Create Amex BTA Travel Agent Master Admin  Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | ta.admin    |
      | password | Travel@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity
  Scenario: Create Amex BTA Travel Agent Sub Admin Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | ta.sub.admin |
      | password | Travel@1234  |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity
  Scenario: Create Amex BTA Travel User Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | ta.user     |
      | password | Travel@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |

  @CreateBTALogin @Sanity
  Scenario: CreateAmex Internal Admin Login
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | Amex.internal.admin |
      | password | Internal@1234       |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |