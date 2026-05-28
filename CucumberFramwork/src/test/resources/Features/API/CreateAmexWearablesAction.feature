@AmexWearable @API

Feature: Create Amex Wearable Action

 @CreateWearablesAction @Sanity
  Scenario: Create Amex Wearables Action - Activate
    Given i have "WearablesAction" api request with template "WearableAction" and following details
      | action | ACTIVATE                |
      | reason | Customer card recovered |
    When i POST "WearablesAction" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator         | value  |
      | success         | true   |
      | data.nfcEnabled | true   |
      | data.status     | Issued |

  @CreateWearablesAction @Sanity
  Scenario: Create Amex Wearables Action - Terminate
    Given i have "WearablesAction" api request with template "WearableAction" and following details
      | action | TERMINATE                                |
      | reason | Customer requested permanent termination |
    When i POST "WearablesAction" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator         | value |
      | success         | true  |
      | data.nfcEnabled | false |
      | data.status     | Terminated  |

  @CreateWearablesAction @Sanity
  Scenario: Create Amex Wearables Action - Suspend
    Given i have "WearablesAction" api request with template "WearableAction" and following details
      | action | SUSPEND                |
      | reason | Card reported lost by customer |
    When i POST "WearablesAction" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator         | value  |
      | success         | true   |
      | data.nfcEnabled | false   |
      | data.status     | Suspended |