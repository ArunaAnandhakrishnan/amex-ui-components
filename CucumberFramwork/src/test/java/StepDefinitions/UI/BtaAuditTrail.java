package StepDefinitions.UI;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaAuditTrail {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaAuditTrail() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Audit Trail Section")
    public void clickAuditTrail() {
        By AuditTrailButton = By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[1]/a[6]");
        uiHelper.click(AuditTrailButton);
        LoggerUtils.logInfo("Clicked the Audit Trail Section");
    }

    @Then("User Select the adit range and generate the report")
    public void selectAditRangeAndGenerateReport() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/select[1]"), "2024");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/select[2]"), "October");
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/button"));
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-audit-trail/div/div/div[2]/div[2]/div[2]/div[3]/button"));
    }

    @Then("User Verify the generated report is displayed in the Audit Trail Section")
    public void verifyGeneratedReport() {
        uiHelper.assertAndAcceptAlertPopup("Downloading in PDF");

    }

}
