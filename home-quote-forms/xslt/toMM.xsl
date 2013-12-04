<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="ISO-8859-1"/>
    <xsl:template match="/">
        <mmJob xsi:schemaLocation="http://www.opensquare.co.uk/mmJob http://mailmerger.osl-cloud.com/xml/ns/mmJob_2_2.xsd" xmlns="http://www.opensquare.co.uk/mmJob" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <template>
                <fileName>household-welcome-letter.docx</fileName>
                <mergeType>pdf</mergeType>
            </template>
            <destinations>
                <store>
                    <saveAsFileName>hsvs0rugu6if7j979pqifnm3cf</saveAsFileName>
                </store>
            </destinations>
            <data>
                <record>
                    <xsl:apply-templates select="quote/*[not(name() = 'products')]"/>
                </record>
            </data>
        </mmJob>
    </xsl:template>
    <xsl:template match="*">
        <xsl:choose>
            <xsl:when test="count(./*) &gt; 0">
                <xsl:apply-templates select="*"/>
            </xsl:when>
            <xsl:otherwise>
                <field xmlns="http://www.opensquare.co.uk/mmJob">
                    <xsl:attribute name="name">
                        <xsl:value-of select="name()"/>
                    </xsl:attribute>
                    <xsl:value-of select="text()"/>
                </field>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>