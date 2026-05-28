package StepDefinitions.UI;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaCaseManagement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaCaseManagement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Case Management Section")
    public void clickCaseManagement() {
        By CaseButton = By.xpath("//a[contains(text(),'Case Management')]");
        uiHelper.click(CaseButton);
        LoggerUtils.logInfo("Clicked the Case Management Section");
    }

    @Then("User Submit the Case Management Request")
    public void SubmitCaseManagementRequest() {
       uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-shell/div/div/div/div/bta-entry/div/div[2]/app-bta-case-management/div/div/div[2]/div[1]/input"),"CASE101");
       uiHelper.click(By.xpath("/html/body/app-root/amex-page-shell/div/div/div/div/bta-entry/div/div[2]/app-bta-case-management/div/div/div[2]/div/button[1]"));
       uiHelper.click(By.xpath("/html/body/app-root/amex-page-shell/div/div/div/div/bta-entry/div/div[2]/app-bta-case-management/div/div/div[2]/table/tbody/tr/td[1]/a"));
       uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-shell/div/div/div/div/bta-entry/div/div[2]/app-bta-case-management/div/div/div[2]/div[2]/textarea"),"Disputed transaction is closed by the merchant settlement");
       uiHelper.click(By.xpath("/html/body/app-root/amex-page-shell/div/div/div/div/bta-entry/div/div[2]/app-bta-case-management/div/div/div[2]/div[3]/button[2]"));
        }

    @Then("User verify the Successful case submission in Case Management Section")
    public void verifyGeneratedReport() {
        uiHelper.assertAndAcceptAlertPopup("Comment submitted.");

    }

}
