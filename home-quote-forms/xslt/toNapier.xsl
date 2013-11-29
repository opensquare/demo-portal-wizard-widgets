<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <debug>false</debug>
            <part partname="buildings">
                <NCDYears>
                    <xsl:value-of select="/quote/home/noClaimsYears"/>
                </NCDYears>
                <Age>
                    <xsl:value-of select="/quote/customer/age"/>
                </Age>
                <VolExcess>50</VolExcess>
                <SumInsured><xsl:value-of select="translate(/quote/products/product[not(calc)][1]/included/buildings/limit, ',', '')"/></SumInsured>
                <xsl:apply-templates select="/quote/products/product[not(calc)][1]/included/buildings/upgrade">
                    <xsl:with-param name="selected">true</xsl:with-param>
                </xsl:apply-templates>
                <xsl:apply-templates select="/quote/products/product[not(calc)][1]/optional/buildings/upgrade">
                    <xsl:with-param name="selected">false</xsl:with-param>
                </xsl:apply-templates>
            </part>
            <part partname="contents">
                <NCDYears>
                    <xsl:value-of select="/quote/home/noClaimsYears"/>
                </NCDYears>
                <Age>
                    <xsl:value-of select="/quote/customer/age"/>
                </Age>
                <VolExcess>50</VolExcess>
                <SumInsured><xsl:value-of select="translate(/quote/products/product[not(calc)][1]/included/contents/limit, ',', '')"/></SumInsured>
                <locksDiscount>0</locksDiscount>
                <alarmDiscount>
                    <xsl:choose>
                        <xsl:when test="/quote/home/burglarAlarm = 'Y' and /quote/home/smokeAlarm = 'Y'">3</xsl:when>
                        <xsl:when test="/quote/home/smokeAlarm = 'Y'">2</xsl:when>
                        <xsl:when test="/quote/home/burglarAlarm = 'Y'">1</xsl:when>
                        <xsl:otherwise>0</xsl:otherwise>
                    </xsl:choose>
                </alarmDiscount>
                <xsl:apply-templates select="/quote/products/product[not(calc)][1]/included/contents/upgrade">
                    <xsl:with-param name="selected">true</xsl:with-param>
                </xsl:apply-templates>
                <xsl:apply-templates select="/quote/products/product[not(calc)][1]/optional/contents/upgrade">
                    <xsl:with-param name="selected">false</xsl:with-param>
                </xsl:apply-templates>
            </part>
            <xsl:apply-templates select="/quote/products/product[not(calc)][1]/included/addons/addon">
                    <xsl:with-param name="selected">true</xsl:with-param>
                </xsl:apply-templates>
                <xsl:apply-templates select="/quote/products/product[not(calc)][1]/optional/addons/addon">
                    <xsl:with-param name="selected">false</xsl:with-param>
                </xsl:apply-templates>
            <part partname="additionalData">
                <xsl:copy-of select="/quote/*[not(name()='calcRef')][not(name()='userType')]"/>
                <calcSource>RQ</calcSource>
            </part>
        </calcData>
    </xsl:template>
    <xsl:template match="upgrade">
        <xsl:param name="selected"/>
        <part partname="upgrade">
            <rateKey>
                <xsl:value-of select="rateKey"/>
            </rateKey>
            <upgradeName>
                <xsl:value-of select="name"/>
            </upgradeName>
            <selected><xsl:value-of select="$selected"/></selected>
        </part>
    </xsl:template>
    <xsl:template match="addon">
        <xsl:param name="selected"/>
        <part partname="addon">
            <rateKey>
                <xsl:value-of select="rateKey"/>
            </rateKey>
            <addonName>
                <xsl:value-of select="name"/>
            </addonName>
            <selected><xsl:value-of select="$selected"/></selected>
        </part>
    </xsl:template>
</xsl:stylesheet>