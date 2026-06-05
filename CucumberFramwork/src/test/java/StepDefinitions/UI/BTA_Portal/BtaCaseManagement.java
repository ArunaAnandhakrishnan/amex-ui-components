package StepDefinitions.UI.BTA_Portal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.WebDriverManagerUtil;

public class BtaCaseManagement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaCaseManagement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }
    private String generatePhoneNumber() {
        long number = (long)(Math.random() * 9_000_000_000L) + 1_000_000_000L;
        return String.valueOf(number);
    }

    @Then("Verify the User Management,Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate user")
    public void verifyCorpMasterSubAdminSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='User Management']"),
                By.xpath("//a[normalize-space()='Memo Statement']"),
                By.xpath("//a[normalize-space()='Large Reports']"),
                By.xpath("//a[normalize-space()='Monthly Statements']"),
                By.xpath("//a[normalize-space()='Payment Allocation']"),
                By.xpath("//a[normalize-space()='Audit Trail']")
        };

        String[] menuNames = {
                "User Management",
                "Memo Statement",
                "Large Reports",
                "Monthly Statements",
                "Payment Allocation",
                "Audit Trail"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }
//    @When("Click the Case Management Section")
//    public void clickCaseManagement() {
//        By CaseButton = By.xpath("//a[normalize-space()='Case Management']");
//        uiHelper.click(CaseButton);
//        LoggerUtils.logInfo("Clicked the Case Management Section");
//    }


@Then("Verify the Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate user")
public void verifyCorpUserSectionsVisibility() {
    By[] navigationMenus = {
            By.xpath("//a[normalize-space()='Memo Statement']"),
            By.xpath("//a[normalize-space()='Large Reports']"),
            By.xpath("//a[normalize-space()='Monthly Statements']"),
            By.xpath("//a[normalize-space()='Payment Allocation']"),
            By.xpath("//a[normalize-space()='Audit Trail']")
    };
    String[] menuNames = {
            "Memo Statement",
            "Large Reports",
            "Monthly Statements",
            "Payment Allocation",
            "Audit Trail"
    };
    uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
}
    @Then("User create new corporate user in user management section")
    public void SubmitCaseManagementRequest() {
        String uniqueEmail = "User" + (1000 + (int)(Math.random() * 9000)) + "@gmail.com";
        String UniqueUserID = "User" + System.currentTimeMillis();
        String ConfirmEmail = uniqueEmail;
        String PhoneNumber = generatePhoneNumber();
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-shell/div/div[2]/div/div/app-bta-user-management/div[2]/div/div[2]/div/button[2]"));
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-select-sm')]"), "Mr");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter full name']"), "John Doe");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter job title']"), "IT Manager");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[1]"), "971");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[1]"),PhoneNumber );
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[2]"), "971");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[2]"),PhoneNumber );
        uiHelper.enterText(By.xpath("//input[@placeholder='user@example.com']"), uniqueEmail);
        uiHelper.enterText(By.xpath("//input[@placeholder='Re-enter email']"), ConfirmEmail);
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-input') and not(@multiple)]"), "UAE");
        uiHelper.click(By.xpath("//input[@type='radio' and @value='admin']"));
        uiHelper.selectMultipleValues(By.xpath("//select[@multiple]"), "Emirates (BTA)");
        uiHelper.enterText(By.xpath("//input[@placeholder='Unique user ID']"), UniqueUserID);
        uiHelper.click(By.xpath("//button[contains(@class,'bta-btn-primary')]"));

    }
}
