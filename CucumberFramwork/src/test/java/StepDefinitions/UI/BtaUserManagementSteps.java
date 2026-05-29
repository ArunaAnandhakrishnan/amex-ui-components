package StepDefinitions.UI;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Helper.UI.UiHelper;
import Utils.WebDriverManagerUtil;
import Utils.LoggerUtils;

public class BtaUserManagementSteps {
    private WebDriver driver;
    private final UiHelper uiHelper;

    public BtaUserManagementSteps() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the User Management Section")
    public void clickNewUser() {
        By newUserButton = By.xpath("//button[contains(text(),'Create New User')]");
        uiHelper.click(newUserButton);
        LoggerUtils.logInfo("Clicked New User button in User Management section");
    }

    @Then("Fill in the user details and save")
    public void fillUserDetailsAndSave()
    {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[1]/select"), "Mr");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[2]/input"), "Surya M");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[3]/input"), "ABC");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[4]/div/input[1]"), "+91");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[4]/div/input[2]"), "9566089761");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[5]/div/input[1]"), "+91");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[5]/div/input[2]"), "8096089761");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[6]/input"), "suryam3019@gmail.com");
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[7]/input"), "suryam3019@gmail.com");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[8]/select"), "Qatar");
        uiHelper.selectRadioButton(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[9]/div/label[1]/input"));
        uiHelper.enterText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[1]/div[10]/input"), "Surya@123");
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-user-management/div/div/div[2]/div[2]/button[2]"));
    }

    @Then("User wait for few seconds")
    public void waitForFewSeconds() throws InterruptedException {
        Thread.sleep(4000);
        LoggerUtils.logInfo("Waited for few seconds to observe the result");
    }
}
