<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="ISO-8859-1"/>
	<xsl:template match="/">
		<calcData xmlns="">
			<coverStart>
				<xsl:value-of select="concat(/quote/cover/startDate, ' ', /quote/cover/startTime)"/>
			</coverStart>
			<coverType>
				<xsl:value-of select="/quote/cover/type"/>
			</coverType>
			<smoker>
				<xsl:value-of select="/quote/customer/smoke"/>
			</smoker>
			<dob>
				<xsl:value-of select="concat(/quote/customer/dob, ' ', '00:00:00')"/>
			</dob>
			<benefit>
				<xsl:value-of select="/quote/cover/perMonth"/>
			</benefit>
			<!--part name="additionalData">
				<xsl:copy-of select="/quote/*[not(name()='calcRef')][not(name()='userType')]"/>
				<calcSource>RQ</calcSource>
			</part-->
		</calcData>
	</xsl:template>
</xsl:stylesheet>