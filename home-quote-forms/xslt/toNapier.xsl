<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <calcData xmlns="">
            <debug>false</debug>
            <part partname="buildings">
                <NCDYears>
                    <xsl:value-of select="/quote/cover/noClaimsYears"/>
                </NCDYears>
                <Age>
                    <xsl:value-of select="/quote/customer/age"/>
                </Age>
                <VolExcess>50</VolExcess>
                <SumInsured>475000</SumInsured>
            </part>
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
            </part>
        </calcData>
    </xsl:template>
</xsl:stylesheet>