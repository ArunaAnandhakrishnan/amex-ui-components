@OnlsLogin @API @Negative

Feature: Create ONLS Login Negative Scenario with Login API

  @CreateBTALoginNegative_001 @Negative
  Scenario: User Login to ONLS BTA Portal by passing Invalid value in Username Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | abc       |
      | password | Corp@1234 |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "401"
    And the following response details should be present
      | locator | value                        |
      | success | false                        |
      | message | Invalid username or password |

  @CreateBTALoginNegative_002 @Negative
  Scenario: User Login to ONLS BTA Portal by passing null value in Username Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | null      |
      | password | Corp@1234 |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {username=must not be blank} |

  @CreateBTALoginNegative_003 @Negative
  Scenario: User Login to ONLS BTA Portal by passing Blank value in Username Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | Blank     |
      | password | Corp@1234 |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {username=must not be blank} |

  @CreateBTALoginNegative_001 @Negative
  Scenario: User Login to ONLS BTA Portal by passing Invalid value in Password Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | corp.sub.admin |
      | password | abc            |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "401"
    And the following response details should be present
      | locator | value                        |
      | success | false                        |
      | message | Invalid username or password |

  @CreateBTALoginNegative_002 @Negative
  Scenario: User Login to ONLS BTA Portal by passing null value in Password Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | corp.sub.admin |
      | password | null           |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {password=must not be blank} |

  @CreateBTALoginNegative_003 @Negative
  Scenario: User Login to ONLS BTA Portal by passing Blank value in Password Field
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | corp.sub.admin |
      | password | Blank          |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {password=must not be blank} |