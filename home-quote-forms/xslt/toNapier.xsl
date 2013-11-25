<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <debug>false</debug>
            <xsl:if test="/quote/cover/type = 'Buildings And Contents' or /quote/cover/type = 'Buildings Only'">
            <part partname="buildings">
                <NCDYears>
                    <xsl:value-of select="/quote/cover/noClaimsYears"/>
                </NCDYears>
                <Age>
                    <xsl:value-of select="/quote/customer/age"/>
                </Age>
                <VolExcess>50</VolExcess>
                <SumInsured>475000</SumInsured>
                <part partname="upgrade">
                    <rateKey>B-SILVER</rateKey>
                    <upgradeName>Silver</upgradeName>
                    <selected>false</selected>
                </part>
                <part partname="upgrade">
                    <rateKey>B-AD</rateKey>
                    <upgradeName>Accidental Damage</upgradeName>
                    <selected>false</selected>
                </part>
            </part>
            </xsl:if>
            <xsl:if test="/quote/cover/type = 'Buildings And Contents' or /quote/cover/type = 'Contents Only'">
            <part partname="contents">
                <NCDYears>
                    <xsl:value-of select="/quote/cover/noClaimsYears"/>
                </NCDYears>
                <Age>
                    <xsl:value-of select="/quote/customer/age"/>
                </Age>
                <VolExcess>50</VolExcess>
                <SumInsured>200000</SumInsured>
                <locksDiscount>0</locksDiscount>
                <alarmDiscount>
                    <xsl:choose>
                        <xsl:when test="/quote/home/burglarAlarm = 'Y' and /quote/home/smokeAlarm = 'Y'">3</xsl:when>
                        <xsl:when test="/quote/home/smokeAlarm = 'Y'">2</xsl:when>
                        <xsl:when test="/quote/home/burglarAlarm = 'Y'">1</xsl:when>
                        <xsl:otherwise>0</xsl:otherwise>
                    </xsl:choose>
                </alarmDiscount>
                <part partname="upgrade">
                    <rateKey>C-SILVER</rateKey>
                    <upgradeName>Silver</upgradeName>
                    <selected>false</selected>
                </part>
                <part partname="upgrade">
                    <rateKey>C-AD</rateKey>
                    <upgradeName>Accidental Damage</upgradeName>
                    <selected>false</selected>
                </part>
            </part>
            </xsl:if>
            <part partname="addon">
                <rateKey>THIS</rateKey>
                <addonName>This</addonName>
                <selected>false</selected>
            </part>
            <part partname="addon">
                <rateKey>THAT</rateKey>
                <addonName>That</addonName>
                <selected>false</selected>
            </part>
            <part partname="addon">
                <rateKey>TOTHER</rateKey>
                <addonName>The Other</addonName>
                <selected>false</selected>
            </part>
            <part partname="additionalData">
                <xsl:copy-of select="/quote/*[not(name()='calcRef')][not(name()='userType')]"/>
                <calcSource>RQ</calcSource>
            </part>
        </calcData>
    </xsl:template>
</xsl:stylesheet>