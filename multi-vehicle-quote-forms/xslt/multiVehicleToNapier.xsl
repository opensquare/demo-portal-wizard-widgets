<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <policyCommencement>01 Feb 2013</policyCommencement>
            <part partname="quote">
                <beforeAfter>before</beforeAfter>
                <xsl:apply-templates select="/quote/vehicles/vehicle"/>
            </part>
        </calcData>
    </xsl:template>
    <xsl:template match="vehicle">
        <part partname="driverForVehicle">
            <primaryVehicleUse>Farming</primaryVehicleUse>
            <dailyCommute>12</dailyCommute>
            <annualDistance>4000</annualDistance>
            <deductibleLevel>1</deductibleLevel>
            <vehicleID>V0123401</vehicleID>                
            <vehicleRateGroup>3</vehicleRateGroup>
            <abstainDiscountApplies>Y</abstainDiscountApplies>
            <multilineDiscountApplies>N</multilineDiscountApplies>
            <mvDiscountApplies>Y</mvDiscountApplies>
            <farmersDiscountApplies>Y</farmersDiscountApplies>
            <universityDiscountApplies>Y</universityDiscountApplies>
            <graduatedDiscountApplies>Y</graduatedDiscountApplies>
            <retireeDiscountApplies>Y</retireeDiscountApplies>
            <specialDiscount>-0.01</specialDiscount>
            <specialSurcharge>0.01</specialSurcharge>
            <driverProfileID>D0565601</driverProfileID>   
            <liabilityLimit>1750000</liabilityLimit>
            <xsl:apply-templates select="cover"/>
            <xsl:variable name="vehicleID"><xsl:value-of select="vehKey"/></xsl:variable>
            <xsl:variable name="mainDriverID"><xsl:value-of select="substring-after(substring-after(name(/quote/policyPermissions/*[starts-with(name(), concat('main-', $vehicleID)) and text() = 'True']), '-'), '-')"/></xsl:variable>
            <xsl:apply-templates select="/quote/drivers/driver[driverID = $mainDriverID]">
                <xsl:with-param name="principal">true</xsl:with-param>
            </xsl:apply-templates>
            <xsl:for-each select="/quote/policyPermissions/*[starts-with(name(), concat('named-', $vehicleID)) and text() = 'True']">
                <xsl:variable name="namedDriverID"><xsl:value-of select="substring-after(substring-after(name(), '-'), '-')"/></xsl:variable>
                <xsl:apply-templates select="/quote/drivers/driver[driverID = $namedDriverID]">
                <xsl:with-param name="principal">false</xsl:with-param>
            </xsl:apply-templates>
            </xsl:for-each>
        </part>
    </xsl:template>
    <xsl:template match="cover">
        <part partname = "cover">
            <coverageCode>XYZ</coverageCode>
            <coverLimit>1250000</coverLimit>
            <groupDiscount>-0.01</groupDiscount>
        </part>
    </xsl:template>
    <xsl:template match="driver">
        <xsl:param name="principal"/>
        <part partname ="operator">
            <principal><xsl:value-of select="$principal"/></principal>
            <gender>M</gender>
            <age>45</age>
            <yearsLicenceHeld>10</yearsLicenceHeld>
            <xsl:apply-templates select="claim"/>
            <xsl:apply-templates select="conviction"/>
        </part>
    </xsl:template>
    <xsl:template match="claim">
        <part partname="claim">
            <claimDate>01 Jun 2010</claimDate>
            <atFault>U</atFault>
            <includeInRating>Y</includeInRating>
        </part>
    </xsl:template>
    <xsl:template match="conviction">
        <part partname="conviction">
            <convictionDate>01 Jan 2012</convictionDate>
            <convictionType>serious</convictionType>
            <includeInRating>Y</includeInRating>
        </part>
    </xsl:template>
</xsl:stylesheet>