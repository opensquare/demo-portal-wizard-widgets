<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="UTF-8" />
	<xsl:template match="@*|node()">
		<xsl:variable name="this" select="." />
		<xsl:choose>
			<xsl:when test="self::text()">
				<xsl:analyze-string select="." regex="^-?[\d,]*\d\.\d\d0+$">
					<xsl:matching-substring>
						<xsl:value-of select="concat(concat(substring-before($this, '.'), '.'), substring(substring-after($this, '.'), 1, 2))" />
					</xsl:matching-substring>
					<xsl:non-matching-substring>
						<xsl:copy>
							<xsl:apply-templates select="$this" />
						</xsl:copy>
					</xsl:non-matching-substring>
				</xsl:analyze-string>
			</xsl:when>
			<xsl:otherwise>
				<xsl:copy>
					<xsl:apply-templates select="@*|node()" />
				</xsl:copy>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>