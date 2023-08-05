package com.bank.web.entity;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name = "kyc_tb")
public class KYC {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "kyc_id", updatable = false)
    private int kycId;

    @Setter
    @OneToOne(mappedBy = "kyc")
    private Account account;
    @Column(name = "fk_account_id")
    private int accountId;

    @Column(name = "name_on_document")
    private String nameOnDocument;
    @Column(name = "pan_number")
    private String panNumber;
    @Column(name = "fathers_name")
    private String fathersName;
    @Column(name = "is_verified")
    private Boolean isVerified;


    public int getKycId() {
        return kycId;
    }

    public void setKycId(int kycId) {
        this.kycId = kycId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getNameOnDocument() {
        return nameOnDocument;
    }

    public void setNameOnDocument(String nameOnDocument) {
        this.nameOnDocument = nameOnDocument;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getFathersName() {
        return fathersName;
    }

    public void setFathersName(String fathersName) {
        this.fathersName = fathersName;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}
