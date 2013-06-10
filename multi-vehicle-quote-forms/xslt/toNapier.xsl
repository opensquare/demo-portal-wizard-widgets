<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <volExcessDiscountBand>
                <xsl:choose>
                    <xsl:when test="/quote/volExcessCode">
                        <xsl:value-of select="/quote/volExcessCode"/>
                    </xsl:when>
                    <xsl:otherwise>1</xsl:otherwise>
                </xsl:choose>
            </volExcessDiscountBand>
            <coverStartDateTime>
                <xsl:value-of select="concat(/quote/vehicle/coverStartDate, ' ', '00:00:00')"/>
            </coverStartDateTime>
            <cover>COMP</cover>
            <initialMiles>8000</initialMiles>
            <part partname="ratingData">
                <postCodeSector>
                    <xsl:value-of select="concat(substring-before(/quote/customer/address/postcode, ' '), ' ', substring(substring-after(/quote/customer/address/postcode, ' '), 1, 1))"/>
                </postCodeSector>
                <volExcessDiscountBand>
                    <xsl:choose>
                        <xsl:when test="/quote/volExcessCode">
                            <xsl:value-of select="/quote/volExcessCode"/>
                        </xsl:when>
                        <xsl:otherwise>1</xsl:otherwise>
                    </xsl:choose>
                </volExcessDiscountBand>
                <mainGender>
                    <xsl:value-of select="substring(/quote/customer/gender, 1, 1)"/>
                </mainGender>
                <mainAge>
                    <xsl:value-of select="/quote/customer/age"/>
                </mainAge>
                <mainMarital>
                    <xsl:value-of select="/quote/customer/maritalStatusCode"/>
                </mainMarital>
                <mainResidency>
                    <xsl:value-of select="/quote/customer/ukResidentYears"/>
                </mainResidency>
                <mainOccupation>
                    <xsl:value-of select="/quote/customer/occupationCode"/>
                </mainOccupation>
                <mainOccupationCode>
                    <xsl:value-of select="/quote/customer/occupationCode"/>
                </mainOccupationCode>
                <drivingQualifications>
                    <xsl:value-of select="/quote/customer/additionalDrivingQualificationsCode"/>
                </drivingQualifications>
                <mainSurname>
                    <xsl:value-of select="/quote/customer/surname"/>
                </mainSurname>
                <mainDob>
                    <xsl:value-of select="/quote/customer/dateOfBirth"/>
                </mainDob>
                <licenceYears>
                    <xsl:value-of select="/quote/customer/licenceHeldYears"/>
                </licenceYears>
                <licenceType>
                    <xsl:value-of select="/quote/customer/licenceTypeCode"/>
                </licenceType>
                <mainHomeowner>
                    <xsl:choose>
                        <xsl:when test="/quote/customer/ownHome='yes'">T</xsl:when>
                        <xsl:otherwise>F</xsl:otherwise>
                    </xsl:choose>
                </mainHomeowner>
                <lhd>
                    <xsl:value-of select="/quote/vehicle/drivingPosition"/>
                </lhd>
                <vehicleAge>
                    <xsl:value-of select="/quote/vehicle/vehicleAge"/>
                </vehicleAge>
                <valueBand>
                    <xsl:call-template name="encodeValue">
                        <xsl:with-param name="_value">
                            <xsl:value-of select="number(/quote/vehicle/marketValue)"/>
                        </xsl:with-param>
                    </xsl:call-template>
                </valueBand>
                <value>
                    <xsl:value-of select="/quote/vehicle/marketValue"/>
                </value>
                <monthsOwned>
                    <xsl:value-of select="/quote/vehicle/monthsOwned"/>
                </monthsOwned>
                <xsl:choose>
                    <xsl:when test="/quote/vehicle/modified='yes'">
                        <modifications>2</modifications>
                    </xsl:when>
                    <xsl:otherwise>
                        <modifications>1</modifications>
                    </xsl:otherwise>
                </xsl:choose>
                <classOfUse>
                    <xsl:value-of select="/quote/classOfUseCode"/>
                </classOfUse>
                <vehicleKey>
                    <xsl:value-of select="/quote/vehicle/vehKey"/>
                </vehicleKey>
                <ncdYears>
                    <xsl:value-of select="/quote/vehicle/noClaimsYears"/>
                </ncdYears>
                <ncdLevel>
                    <xsl:value-of select="number(/quote/vehicle/noClaimsYears) + 1"/>
                </ncdLevel>
                <ncdProtected>
                    <xsl:value-of select="/quote/protectNoClaims"/>
                </ncdProtected>
                <drivingRestrictions>
                    <xsl:choose>
                        <!-- Insured Only -->
                        <xsl:when test="count(/quote/additionalDrivers/driver)=0">1</xsl:when>
                        <!-- Insured And Spouse -->
                        <xsl:when test="count(/quote/additionalDrivers/driver)=1 and /quote/additionalDrivers/driver/relationshipToPolicyHolder='Husband/Wife'">2</xsl:when>
                        <!-- Insured And Named Drivers -->
                        <xsl:when test="count(/quote/additionalDrivers/driver)=1">3</xsl:when>
                        <xsl:when test="count(/quote/additionalDrivers/driver)=2">4</xsl:when>
                        <xsl:when test="count(/quote/additionalDrivers/driver)=3">5</xsl:when>
                        <xsl:when test="count(/quote/additionalDrivers/driver)=4">6</xsl:when>
                    </xsl:choose>
                </drivingRestrictions>
                <garaging>2</garaging>
                <security><xsl:value-of select="/quote/vehicle/securityDevicesCode"/></security>
                <mileage>6</mileage>
            </part>
            <xsl:apply-templates select="/quote/customer"/>
            <xsl:apply-templates select="/quote/additionalDrivers/driver"/>
            <part partname="additionalData">
                <xsl:copy-of select="/quote/*[not(name()='calcRef')][not(name()='userType')]"/>
                <calcSource>RQ</calcSource>
            </part>
        </calcData>
    </xsl:template>
    <xsl:template match="customer|driver">
        <xsl:variable name="index">
            <xsl:value-of select="@index"/>
        </xsl:variable>
        <part partname="driver" xmlns="">
            <seq>
                <xsl:value-of select="1 + number($index)"/>
            </seq>
            <xsl:variable name="type">
                <xsl:choose>
                    <xsl:when test="name()='customer'">policyHolder</xsl:when>
                    <xsl:otherwise>namedDriver</xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <type>
                <xsl:value-of select="$type"/>
            </type>
            <residencyYears>
                <xsl:value-of select="ukResidentYears"/>
            </residencyYears>
            <gender>
                <xsl:value-of select="substring(/quote/customer/gender, 1, 1)"/>
            </gender>
            <dob>
                <xsl:value-of select="dateOfBirth"/>
            </dob>
            <xsl:copy-of select="age"/>
            <xsl:copy-of select="licenceHeldYears"/>
            <xsl:copy-of select="licenceHeldSinceDate"/>
            <driveOtherVehicles>
                <xsl:value-of select="accessToOtherVehicles"/>
            </driveOtherVehicles>
            <xsl:copy-of select="medicalConditions"/>
            <occupation>
                <xsl:value-of select="substring-before(concat(occupationCode, '.'), '.')"/>
            </occupation>
            <licenceType>
                <xsl:value-of select="licenceTypeCode"/>
            </licenceType>
            <xsl:apply-templates select="*[*]">
                <xsl:with-param name="type">
                    <xsl:value-of select="$type"/>
                </xsl:with-param>
            </xsl:apply-templates>
        </part>
    </xsl:template>
    <xsl:template match="medicalCondition">
        <xsl:param name="type"/>
        <xsl:if test="condition!=''">
            <part partname="medicalCondition" xmlns="">
                <xsl:copy-of select="*"/>
                <type>
                    <xsl:value-of select="$type"/>
                </type>
            </part>
        </xsl:if>
    </xsl:template>
    <xsl:template match="claim">
        <xsl:param name="type"/>
        <xsl:if test="claimType!=''">
            <part partname="claim" xmlns="">
                <xsl:copy-of select="*"/>
                <type>
                    <xsl:value-of select="$type"/>
                </type>
            </part>
        </xsl:if>
    </xsl:template>
    <xsl:template match="conviction">
        <xsl:param name="type"/>
        <xsl:if test="convictionCode!=''">
            <part partname="conviction" xmlns="">
                <xsl:copy-of select="*"/>
                <type>
                    <xsl:value-of select="$type"/>
                </type>
                <driverAge>
                    <xsl:value-of select="../../age"/>
                </driverAge>
                <licencePoints>
                    <xsl:value-of select="points"/>
                </licencePoints>
                <suspension>
                    <xsl:value-of select="monthsDisqualified"/>
                </suspension>
            </part>
        </xsl:if>
    </xsl:template>
    <xsl:template name="encodeValue">
        <xsl:param name="_value"/>
        <xsl:choose>
            <xsl:when test="$_value &gt; 100000 ">21</xsl:when>
            <xsl:when test="$_value &gt; 90000 ">20</xsl:when>
            <xsl:when test="$_value &gt; 80000 ">19</xsl:when>
            <xsl:when test="$_value &gt; 70000 ">18</xsl:when>
            <xsl:when test="$_value &gt; 60000 ">17</xsl:when>
            <xsl:when test="$_value &gt; 50000 ">16</xsl:when>
            <xsl:when test="$_value &gt; 40000 ">15</xsl:when>
            <xsl:when test="$_value &gt; 35000 ">14</xsl:when>
            <xsl:when test="$_value &gt; 30000 ">13</xsl:when>
            <xsl:when test="$_value &gt; 25000 ">12</xsl:when>
            <xsl:when test="$_value &gt; 20000 ">11</xsl:when>
            <xsl:when test="$_value &gt; 15000 ">10</xsl:when>
            <xsl:when test="$_value &gt; 10000 ">9</xsl:when>
            <xsl:when test="$_value &gt; 5000 ">8</xsl:when>
            <xsl:when test="$_value &gt; 4000 ">7</xsl:when>
            <xsl:when test="$_value &gt; 3000 ">6</xsl:when>
            <xsl:when test="$_value &gt; 2000 ">5</xsl:when>
            <xsl:when test="$_value &gt; 1500 ">4</xsl:when>
            <xsl:when test="$_value &gt; 1000 ">3</xsl:when>
            <xsl:when test="$_value &gt; 500 ">2</xsl:when>
            <xsl:otherwise>1</xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>