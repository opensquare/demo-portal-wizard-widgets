<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <policyCommencement>
                <xsl:value-of select="/quote/policyOptions/coverStartDate"/>
            </policyCommencement>
            <part partname="quote">
                <beforeAfter>before</beforeAfter>
                <xsl:apply-templates select="/quote/vehicles/vehicle"/>
            </part>
        </calcData>
    </xsl:template>
    <xsl:template match="vehicle">
        <part partname="driverForVehicle">
            <xsl:variable name="vehicleID">
                <xsl:value-of select="vehKey"/>
            </xsl:variable>
            <xsl:variable name="mainDriverID">
                <xsl:value-of select="substring-after(substring-after(name(/quote/policyPermissions/*[starts-with(name(), concat('main-', $vehicleID)) and text() = 'true']), '-'), '-')"/>
            </xsl:variable>
            <effectiveStart>
                <xsl:value-of select="concat(/quote/policyOptions/coverStartDate, ' 00:00:00')"/>
            </effectiveStart>
            <effectiveEnd>
                <xsl:value-of select="concat(/quote/policyOptions/coverEndDate, ' 00:00:00')"/>
            </effectiveEnd>
            <primaryVehicleUse><xsl:value-of select="primaryVehicleUse"/></primaryVehicleUse>
            <dailyCommute><xsl:value-of select="dailyCommute"/></dailyCommute>
            <annualDistance><xsl:value-of select="amountDistance"/></annualDistance>
            <deductibleLevel>
                <xsl:value-of select="/quote/policyOptions/deductable"/>
            </deductibleLevel>
            <vehicleID>
                <xsl:value-of select="vehKey"/>
            </vehicleID>                
            <viccCode>1013</viccCode>
            <abstainDiscountApplies>
                <xsl:choose>
                    <xsl:when test="/quote/drivers/driver[driverID = $mainDriverID]/alcohol = 'No'">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </abstainDiscountApplies>
            <multilineDiscountApplies>
                <xsl:choose>
                    <xsl:when test="/quote/policyOptions/otherProducts = 'Yes'">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </multilineDiscountApplies>
            <mvDiscountApplies>
                <xsl:choose>
                    <xsl:when test="count(/quote/vehicles/vehicle) &gt; 1">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </mvDiscountApplies>
            <farmersDiscountApplies>
                <xsl:choose>
                    <xsl:when test="/quote/drivers/driver[driverID = $mainDriverID]/occupation = 'Farmer'">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </farmersDiscountApplies>
            <universityDiscountApplies>
                <xsl:choose>
                    <xsl:when test="/quote/drivers/driver[driverID = $mainDriverID]/occupation = 'University student'">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </universityDiscountApplies>
            <graduatedDiscountApplies>Y</graduatedDiscountApplies>
            <retireeDiscountApplies>
                <xsl:choose>
                    <xsl:when test="/quote/drivers/driver[driverID = $mainDriverID]/occupation = 'Retiree'">Y</xsl:when>
                    <xsl:otherwise>N</xsl:otherwise>
                </xsl:choose>
            </retireeDiscountApplies>
            <specialDiscount>-0.01</specialDiscount>
            <specialSurcharge>0.01</specialSurcharge>
            <driverProfileID>D0565601</driverProfileID>   
            <liabilityLimit>
                <xsl:value-of select="/quote/policyOptions/liability"/>
            </liabilityLimit>
            <part partname = "cover">
                <coverageCode>ABC</coverageCode>
                <coverLimit>1750000</coverLimit>
                <groupDiscount>-0.05</groupDiscount>
                <indexationApplies>Y</indexationApplies>
            </part>
            <part partname = "cover">
                <coverageCode>XYZ</coverageCode>
                <coverLimit>1250000</coverLimit>
                <groupDiscount>-0.01</groupDiscount>
            </part>
            <xsl:apply-templates select="/quote/drivers/driver[driverID = $mainDriverID]">
                <xsl:with-param name="principal">true</xsl:with-param>
            </xsl:apply-templates>
            <xsl:for-each select="/quote/policyPermissions/*[starts-with(name(), concat('named-', $vehicleID)) and text() = 'true']">
                <xsl:variable name="namedDriverID">
                    <xsl:value-of select="substring-after(substring-after(name(), '-'), '-')"/>
                </xsl:variable>
                <xsl:apply-templates select="/quote/drivers/driver[driverID = $namedDriverID]">
                    <xsl:with-param name="principal">false</xsl:with-param>
                </xsl:apply-templates>
            </xsl:for-each>
        </part>
    </xsl:template>
    <xsl:template match="driver">
        <xsl:param name="principal"/>
        <part partname ="operator">
            <principal>
                <xsl:value-of select="$principal"/>
            </principal>
            <gender>
                <xsl:value-of select="substring(gender, 1, 1)"/>
            </gender>
            <age>
                <xsl:value-of select="age"/>
            </age>
            <yearsLicenceHeld>
                <xsl:value-of select="yearsLicenceHeld"/>
            </yearsLicenceHeld>
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