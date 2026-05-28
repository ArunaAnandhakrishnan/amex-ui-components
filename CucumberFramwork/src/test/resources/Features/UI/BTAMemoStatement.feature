@UI @BTA

Feature: BTA Memo Statement in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page

  @Sanity @MemoStatement_Test_01
  Scenario: Verify BTA Memo Statement PDF functionality
    When Click the Memo Statement Section
    Then User Select the BTA Number and click the View Statement
    And User Download the Memo Statement PDF

  @Sanity @MemoStatement_Test_02
  Scenario: Verify BTA Memo Statement Excel functionality
    When Click the Memo Statement Section
    Then User Select the BTA Number and click the View Statement
    And User Download the Memo Statement Excel

  @Sanity @MemoStatement_Test_03
  Scenario: Verify BTA Memo Statement RTF functionality
    When Click the Memo Statement Section
    Then User Select the BTA Number and click the View Statement
    And User Download the Memo Statement RTF

  @Sanity @MemoStatement_Test_04
  Scenario: Verify BTA Memo Statement CSV functionality
    When Click the Memo Statement Section
    Then User Select the BTA Number and click the View Statement
    And User Download the Memo Statement CSV
    And User wait for few seconds
