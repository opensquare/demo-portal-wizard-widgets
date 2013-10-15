<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <data>
            <brand><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Properties/*[@name='brand']"/></brand>
            <brandAbbreviation><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Properties/*[@name='brandAbbreviation']"/></brandAbbreviation>
            <productName><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Properties/*[@name='productName']"/></productName>
            <referenceNumberSequence><xsl:value-of select="substring-before(TimeSpanEntity/TimeSpanEntityVersion/Properties/*[@name='referenceNumberSequence'], '.')"/></referenceNumberSequence>
            <referenceNumberLength><xsl:value-of select="substring-after(TimeSpanEntity/TimeSpanEntityVersion/Properties/*[@name='referenceNumberSequence'], '.')"/></referenceNumberLength>
            <policyTemplate><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Parts/*[identifier/assocIdentifier/relationship='policyTemplate']/description"/></policyTemplate>
            <clientTemplate><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Parts//*[description='Register Client']/TimeSpanEntityVersion/Parts/*/description"/></clientTemplate>
            <insurer><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Parts/*[identifier/assocIdentifier/relationship='insurer']/description"/></insurer>
            <vendor><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion/Parts/*[identifier/assocIdentifier/relationship='vendor']/description"/></vendor>
            <rqWidget><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion//Properties/*[@name='rqWidget']"/></rqWidget>
            <cpWidget><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion//Properties/*[@name='cpWidget']"/></cpWidget>
            <newBusinessCalc><xsl:value-of select="TimeSpanEntity/TimeSpanEntityVersion//Properties/*[@name='newBusinessCalc']"/></newBusinessCalc>
            <addons>
            </addons>
        </data>
    </xsl:template>
</xsl:stylesheet>