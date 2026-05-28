package Listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import Utils.ExtentReportManager;
import Utils.LoggerUtils;

/**
 * TestListener — kept for compatibility but flush is now handled
 * directly in Cucumber @After hooks (the correct place for Cucumber+TestNG).
 *
 * NOTE: TestNG lifecycle methods (onTestStart, onTestSuccess etc.) are NOT
 * triggered per Cucumber scenario — they fire per Runner class execution.
 * So onFinish here acts as a final safety-net flush only.
 */
public class TestListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        LoggerUtils.logInfo("TestNG Runner started: " + result.getName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        LoggerUtils.logInfo("TestNG Runner passed: " + result.getName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        LoggerUtils.logInfo("TestNG Runner failed: " + result.getName());
        if (result.getThrowable() != null) {
            ExtentReportManager.logException(new Exception(result.getThrowable()));
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        LoggerUtils.logInfo("TestNG Runner skipped: " + result.getName());
    }

    @Override
    public void onStart(ITestContext context) {
        LoggerUtils.logInfo("Test suite started: " + context.getName());
    }

    @Override
    public void onFinish(ITestContext context) {
        LoggerUtils.logInfo("Test suite finished: " + context.getName());
        // Safety-net flush — primary flush happens in @After hooks
        ExtentReportManager.flushReport();
        LoggerUtils.logInfo("Final ExtentReport flush completed.");
    }
}
