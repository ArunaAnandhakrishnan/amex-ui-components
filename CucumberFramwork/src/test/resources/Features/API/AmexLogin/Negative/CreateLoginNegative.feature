@OnlsLogin @API @Negative

Feature: Create BTA Login Negative Scenario with Login API

  @CreateBTALoginNegative_001 @Negative
  Scenario: User Login to BTA Portal by passing Invalid value in Username Field
    Given i have "BTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | abc       |
      | password | Corp@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "401"
    And the following response details should be present
      | locator | value                        |
      | success | false                        |
      | message | Invalid username or password |

  @CreateBTALoginNegative_002 @Negative
  Scenario: User Login to BTA Portal by passing null value in Username Field
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | null      |
      | password | Corp@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {username=must not be blank} |

  @CreateBTALoginNegative_003 @Negative
  Scenario: User Login to BTA Portal by passing Blank value in Username Field
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | Blank     |
      | password | Corp@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {username=must not be blank} |

  @CreateBTALoginNegative_001 @Negative
  Scenario: User Login to BTA Portal by passing Invalid value in Password Field
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.sub.admin |
      | password | abc            |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "401"
    And the following response details should be present
      | locator | value                        |
      | success | false                        |
      | message | Invalid username or password |

  @CreateBTALoginNegative_002 @Negative
  Scenario: User Login to BTA Portal by passing null value in Password Field
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.sub.admin |
      | password | null           |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {password=must not be blank} |

  @CreateBTALoginNegative_003 @Negative
  Scenario: User Login to BTA Portal by passing Blank value in Password Field
    Given i have "CreateBTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | corp.sub.admin |
      | password | Blank          |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {password=must not be blank} |