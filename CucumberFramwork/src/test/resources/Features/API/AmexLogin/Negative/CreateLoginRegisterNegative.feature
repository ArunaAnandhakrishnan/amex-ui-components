@BTARegistration @API @Negative

Feature: Create BTA Registration Negative Scenario with Registration API

  @CreateBTARegistration @Negative
  Scenario: User passes empty values in Username Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | username | Blank |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                                       |
      | success | false                                                       |
      | message | Validation failed: {username=size must be between 3 and 50} |

  @CreateBTARegistration @Negative
  Scenario: User passes null values in Username Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | username | null |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                          |
      | success | false                                          |
      | message | Validation failed: {username=must not be null} |

  @CreateBTARegistration @Negative
  Scenario: User passes duplicate username in Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration"
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "201"
    And i have following values from the transaction
      | locator       | varname   |
      | data.username | #UserName |
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | username | #UserName |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value              |
      | success | false              |
      | message | #should be present |

  @CreateBTARegistration @Negative
  Scenario: User passes empty values in Email Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | email | Blank |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                        |
      | success | false                                        |
      | message | Validation failed: {email=must not be blank} |

  @CreateBTARegistration @Negative
  Scenario: User passes Null values in Email Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | email | null |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                        |
      | success | false                                        |
      | message | Validation failed: {email=must not be blank} |

  @CreateBTARegistration @Negative
  Scenario: User passes empty values in password Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | password | Blank |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                                        |
      | success | false                                                        |
      | message | Validation failed: {password=size must be between 8 and 100} |

  @CreateBTARegistration @Negative
  Scenario: User passes Null values in Password Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | password | null |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                          |
      | success | false                                          |
      | message | Validation failed: {password=must not be null} |

  @CreateBTARegistration @Negative
  Scenario: User passes empty values in firstname Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | fullName | Blank |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value              |
      | success | false              |
      | message | #should be present |

  @CreateBTARegistration @Negative
  Scenario: User passes Null values in firstname Request body to perform BTA Registration
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration" and following details
      | fullName | null |
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "400"
    And the following response details should be present
      | locator | value                                           |
      | success | false                                           |
      | message | Validation failed: {fullName=must not be blank} |