package com.example.auth.util;

import java.util.Set;

public final class Roles {

    // BTA Portal
    public static final String CORP_MASTER_ADMIN   = "ROLE_CORP_MASTER_ADMIN";
    public static final String CORP_SUB_ADMIN      = "ROLE_CORP_SUB_ADMIN";
    public static final String CORP_USER           = "ROLE_CORP_USER";
    public static final String TA_MASTER_ADMIN     = "ROLE_TA_MASTER_ADMIN";
    public static final String TA_SUB_ADMIN        = "ROLE_TA_SUB_ADMIN";
    public static final String TA_USER             = "ROLE_TA_USER";
    public static final String AEME_INTERNAL_ADMIN = "ROLE_AEME_INTERNAL_ADMIN";

    // OMS Portal
    public static final String MERCHANT_USER       = "ROLE_MERCHANT_USER";
    public static final String MRM_USER            = "ROLE_MRM_USER";
    public static final String OMS_ADMIN           = "ROLE_OMS_ADMIN";
    public static final String OMS_SUB_USER        = "ROLE_OMS_SUB_USER";
    public static final String OMS_VAT_USER        = "ROLE_OMS_VAT_USER";

    // ONLS Helper Portal
    public static final String ONLS_ADMIN          = "ROLE_ONLS_ADMIN";
    public static final String CSA                 = "ROLE_CSA";

    // BCRB / AECB Bulk Reporting
    public static final String RISK_USER           = "ROLE_RISK_USER";
    public static final String COMP_OPS_USER       = "ROLE_COMP_OPS_USER";
    public static final String AECB_USER           = "ROLE_AECB_USER";
    public static final String SYS_ADMIN           = "ROLE_SYS_ADMIN";

    // SOC / ROC Portal
    public static final String SOC_BUSINESS_USER   = "ROLE_SOC_BUSINESS_USER";

    public static final Set<String> ALL = Set.of(
            CORP_MASTER_ADMIN, CORP_SUB_ADMIN, CORP_USER,
            TA_MASTER_ADMIN, TA_SUB_ADMIN, TA_USER,
            AEME_INTERNAL_ADMIN,
            MERCHANT_USER, MRM_USER, OMS_ADMIN, OMS_SUB_USER, OMS_VAT_USER,
            ONLS_ADMIN, CSA,
            RISK_USER, COMP_OPS_USER, AECB_USER, SYS_ADMIN,
            SOC_BUSINESS_USER
    );

    private Roles() {}
}