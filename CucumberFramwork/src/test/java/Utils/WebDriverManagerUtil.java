package Utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

import java.time.Duration;

/**
 * WebDriverManagerUtil — Fixed.
 *
 * ROOT CAUSE of browser appearing during API tests:
 *   driver was a plain static field shared across all tests.
 *   Even when ApiTestRunner ran, any class loading or stray @Before
 *   could call getDriver() and spin up a browser.
 *
 * FIX:
 *   1. Use ThreadLocal<WebDriver> — each thread gets its own driver.
 *   2. Driver is NEVER initialized unless explicitly called from UI Hooks.
 *   3. API Hooks never call getDriver() or initDriver() — so no browser opens.
 */
public class WebDriverManagerUtil {

    // ThreadLocal ensures no driver leaks between UI and API test threads
    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();

    /**
     * Returns existing driver or initializes a new one.
     * Called ONLY from UI Hooks @Before — never from API Hooks.
     */
    public static WebDriver getDriver() {
        if (driverThreadLocal.get() == null) {
            initializeDriver();
        }
        return driverThreadLocal.get();
    }

    /**
     * Check if driver is already active — avoids accidental init.
     */
    public static boolean isDriverActive() {
        return driverThreadLocal.get() != null;
    }

    private static void initializeDriver() {
        String browser = ConfigReader.getProperty("browser").toLowerCase();

        WebDriver driver;
        switch (browser) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
                chromeOptions.addArguments("--disable-extensions");
                chromeOptions.addArguments("--no-sandbox");
                chromeOptions.addArguments("--disable-dev-shm-usage");
                driver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver(new FirefoxOptions());
                break;

            case "edge":
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver(new EdgeOptions());
                break;

            default:
                throw new RuntimeException("Browser not supported: " + browser);
        }

        int implicitWait   = Integer.parseInt(ConfigReader.getProperty("implicitWait"));
        int pageLoadTimeout = Integer.parseInt(ConfigReader.getProperty("pageLoadTimeout"));

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(implicitWait));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(pageLoadTimeout));
        driver.manage().window().maximize();

        driverThreadLocal.set(driver);
        LoggerUtils.logInfo("Browser initialized: " + browser);
    }

    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
            LoggerUtils.logInfo("Browser closed and ThreadLocal cleared.");
        }
    }

    public static void navigateTo(String url) {
        getDriver().get(url);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        LoggerUtils.logInfo("Navigated to: " + url);
    }
}
