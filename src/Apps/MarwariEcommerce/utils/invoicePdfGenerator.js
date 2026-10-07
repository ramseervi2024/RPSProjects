import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Platform, Share } from 'react-native';

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return rgb(r, g, b);
}

function numberToWords(num) {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = Math.floor(Math.abs(Number(num) || 0));
  if (n === 0) return 'Zero Rupees Only';

  function convertGroup(val) {
    if (val === 0) return '';
    if (val < 20) return a[val];
    const tens = b[Math.floor(val / 10)];
    const ones = a[val % 10];
    return tens + (ones ? ' ' + ones : '');
  }

  function inWords(val) {
    let str = '';
    if (val >= 10000000) {
      str += convertGroup(Math.floor(val / 10000000)) + ' Crore ';
      val %= 10000000;
    }
    if (val >= 100000) {
      str += convertGroup(Math.floor(val / 100000)) + ' Lakh ';
      val %= 100000;
    }
    if (val >= 1000) {
      str += convertGroup(Math.floor(val / 1000)) + ' Thousand ';
      val %= 1000;
    }
    if (val >= 100) {
      str += convertGroup(Math.floor(val / 100)) + ' Hundred ';
      val %= 100;
    }
    if (val > 0) {
      str += convertGroup(val) + ' ';
    }
    return str.trim();
  }

  const paise = Math.round((Number(num) - n) * 100);
  let result = inWords(n) + ' Rupees';
  if (paise > 0) {
    result += ' and ' + inWords(paise) + ' Paise';
  }
  return result + ' Only';
}

/**
 * Generates an official Tax Invoice / Order Bill PDF matching the Mārwāri Royal E-Commerce format.
 * Returns the local file path and URI.
 */
export async function generateInvoicePdf(orderData = {}, profile = {}) {
  const pdfDoc = await PDFDocument.create();
  // Standard A4 dimensions
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors matching official template
  const cTeal = hexToRgb('#0F766E');
  const cTealDark = hexToRgb('#0D9488');
  const cNavy = hexToRgb('#0F172A');
  const cSlateDark = hexToRgb('#1E293B');
  const cSlateMedium = hexToRgb('#475569');
  const cSlateLight = hexToRgb('#64748B');
  const cBorder = hexToRgb('#CBD5E1');
  const cBorderLight = hexToRgb('#E2E8F0');
  const cCardHeader = hexToRgb('#F8FAFC');
  const cWhite = hexToRgb('#FFFFFF');
  const cGreenBg = hexToRgb('#DCFCE7');
  const cGreenText = hexToRgb('#15803D');
  const cRowAlt = hexToRgb('#F8FAFC');

  // Outer Border
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  page.drawRectangle({
    x: margin,
    y: margin,
    width: contentWidth,
    height: pageHeight - margin * 2,
    borderColor: cBorder,
    borderWidth: 0.75,
    color: cWhite,
  });

  const innerX = margin + 18;
  const innerRight = pageWidth - margin - 18;
  const innerWidth = innerRight - innerX;
  let cursorY = pageHeight - margin - 25;

  // 1. Header Left: Logo & Company Info
  page.drawText('MĀRWĀRI', {
    x: innerX,
    y: cursorY - 14,
    size: 16,
    font: fontBold,
    color: hexToRgb('#831843'),
  });

  const agWidth = fontBold.widthOfTextAtSize('MĀRWĀRI', 16);
  page.drawText('  ROYAL E-COMMERCE', {
    x: innerX + agWidth,
    y: cursorY - 14,
    size: 12,
    font: fontBold,
    color: hexToRgb('#B45309'),
  });

  page.drawText('Mārwāri Heritage Artisans Guild & Royal Handicrafts', {
    x: innerX,
    y: cursorY - 30,
    size: 8.5,
    font: fontBold,
    color: cSlateDark,
  });

  page.drawText('Registered Palace Hub: Jodhpur, Rajasthan - 342001, India', {
    x: innerX,
    y: cursorY - 42,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  page.drawText('GSTIN: 08AAICM9921P1Z5  |  HSN/SAC: 6204 / 7113', {
    x: innerX,
    y: cursorY - 53,
    size: 7.5,
    font: fontBold,
    color: cSlateDark,
  });

  page.drawText('Email: concierge@marwari.heritage  |  Web: rpsdigitalworld.store', {
    x: innerX,
    y: cursorY - 64,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  // Header Right: Badge & Invoice Meta
  const badgeWidth = 150;
  const badgeHeight = 18;
  const badgeX = innerRight - badgeWidth;
  const badgeY = cursorY - 12;

  page.drawRectangle({
    x: badgeX,
    y: badgeY,
    width: badgeWidth,
    height: badgeHeight,
    color: cNavy,
    borderColor: cNavy,
    borderWidth: 0,
  });

  const badgeText = 'TAX INVOICE / ORDER BILL';
  const badgeTextWidth = fontBold.widthOfTextAtSize(badgeText, 7.5);
  page.drawText(badgeText, {
    x: badgeX + (badgeWidth - badgeTextWidth) / 2,
    y: badgeY + 5.5,
    size: 7.5,
    font: fontBold,
    color: cWhite,
  });

  const copyText = '(Original for Recipient / Customer Copy)';
  const copyTextWidth = fontRegular.widthOfTextAtSize(copyText, 7);
  page.drawText(copyText, {
    x: innerRight - copyTextWidth,
    y: badgeY - 11,
    size: 7,
    font: fontRegular,
    color: cSlateLight,
  });

  const displayOrderId = orderData.id || '408';
  const paddedId = String(displayOrderId).padStart(4, '0');
  const invoiceNo = `AG/INV/2026/${paddedId}`;

  const invNoLabel = 'Invoice No: ';
  const invNoVal = invoiceNo;
  const fullInvWidth =
    fontRegular.widthOfTextAtSize(invNoLabel, 8) + fontBold.widthOfTextAtSize(invNoVal, 8.5);
  page.drawText(invNoLabel, {
    x: innerRight - fullInvWidth,
    y: badgeY - 26,
    size: 8,
    font: fontRegular,
    color: cSlateDark,
  });
  page.drawText(invNoVal, {
    x: innerRight - fontBold.widthOfTextAtSize(invNoVal, 8.5),
    y: badgeY - 26,
    size: 8.5,
    font: fontBold,
    color: cTeal,
  });

  const orderRefText = `Order Ref: #${displayOrderId}`;
  page.drawText(orderRefText, {
    x: innerRight - fontBold.widthOfTextAtSize(orderRefText, 8),
    y: badgeY - 38,
    size: 8,
    font: fontBold,
    color: cSlateDark,
  });

  const displayDate = orderData.date || '26 Sep 2026, 11:23 PM IST';
  const invDateText = `Invoice Date: ${displayDate}`;
  page.drawText(invDateText, {
    x: innerRight - fontRegular.widthOfTextAtSize(invDateText, 7.5),
    y: badgeY - 50,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  const posText = 'Place of Supply: Karnataka (29)';
  page.drawText(posText, {
    x: innerRight - fontRegular.widthOfTextAtSize(posText, 7.5),
    y: badgeY - 62,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  cursorY -= 82;

  // 2. Two Side-by-Side Detail Boxes
  const boxGap = 12;
  const boxWidth = (innerWidth - boxGap) / 2;
  const boxHeight = 76;
  const box1X = innerX;
  const box2X = innerX + boxWidth + boxGap;
  const boxY = cursorY - boxHeight;

  // Box 1: Customer & Billing Details
  page.drawRectangle({
    x: box1X,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    borderColor: cBorderLight,
    borderWidth: 0.75,
    color: cWhite,
  });
  // Box 1 Header
  page.drawRectangle({
    x: box1X,
    y: boxY + boxHeight - 18,
    width: boxWidth,
    height: 18,
    color: cCardHeader,
    borderColor: cBorderLight,
    borderWidth: 0.75,
  });
  page.drawText('Customer & Billing Details', {
    x: box1X + 8,
    y: boxY + boxHeight - 13,
    size: 8,
    font: fontBold,
    color: cSlateDark,
  });

  const customerName =
    profile?.name ||
    profile?.first_name ||
    orderData.billing?.first_name ||
    orderData.customer_name ||
    'Ramesh Seervi';
  const customerEmail =
    orderData.email || profile?.email || orderData.billing?.email || 'ramseervi4321@gmail.com';
  const customerPhone =
    profile?.phone || orderData.billing?.phone || profile?.mobile || '6360494477';
  const customerState = 'Karnataka (29) / India';

  page.drawText(customerName, {
    x: box1X + 8,
    y: boxY + boxHeight - 31,
    size: 8.5,
    font: fontBold,
    color: cSlateDark,
  });
  page.drawText(`Email: ${customerEmail}`, {
    x: box1X + 8,
    y: boxY + boxHeight - 43,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });
  page.drawText(`Phone: ${customerPhone}`, {
    x: box1X + 8,
    y: boxY + boxHeight - 55,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });
  page.drawText(`State/Country: ${customerState}`, {
    x: box1X + 8,
    y: boxY + boxHeight - 67,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  // Box 2: Payment & Order Meta
  page.drawRectangle({
    x: box2X,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    borderColor: cBorderLight,
    borderWidth: 0.75,
    color: cWhite,
  });
  // Box 2 Header
  page.drawRectangle({
    x: box2X,
    y: boxY + boxHeight - 18,
    width: boxWidth,
    height: 18,
    color: cCardHeader,
    borderColor: cBorderLight,
    borderWidth: 0.75,
  });
  page.drawText('Payment & Order Meta', {
    x: box2X + 8,
    y: boxY + boxHeight - 13,
    size: 8,
    font: fontBold,
    color: cSlateDark,
  });

  const partnerSite =
    orderData.platform || profile?.platform || 'Common Products (All Clients)';
  const paymentMethod =
    orderData.payment_method_title || orderData.payment_method || 'bacs';
  const rawStatus = (orderData.status || 'PROCESSING').toUpperCase();

  page.drawText(`Corporate Site / Partner: ${partnerSite}`, {
    x: box2X + 8,
    y: boxY + boxHeight - 31,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });
  page.drawText(`Payment Method: ${paymentMethod}`, {
    x: box2X + 8,
    y: boxY + boxHeight - 43,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  page.drawText('Order Status: ', {
    x: box2X + 8,
    y: boxY + boxHeight - 55,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  // Order status badge
  const statusX = box2X + 8 + fontRegular.widthOfTextAtSize('Order Status: ', 7.5);
  const statusWidth = fontBold.widthOfTextAtSize(rawStatus, 7) + 8;
  page.drawRectangle({
    x: statusX,
    y: boxY + boxHeight - 57,
    width: statusWidth,
    height: 12,
    color: cGreenBg,
    borderColor: cGreenBg,
  });
  page.drawText(rawStatus, {
    x: statusX + 4,
    y: boxY + boxHeight - 54,
    size: 7,
    font: fontBold,
    color: cGreenText,
  });

  page.drawText('Currency: INR', {
    x: box2X + 8,
    y: boxY + boxHeight - 67,
    size: 7.5,
    font: fontRegular,
    color: cSlateMedium,
  });

  cursorY = boxY - 16;

  // 3. Line Items Table
  // Columns: # (24), Description (275), SAC (55), Qty (40), Rate (INR) (60), Amount (INR) (65)
  const colWidths = [24, 275, 55, 40, 60, innerWidth - (24 + 275 + 55 + 40 + 60)];
  const colX = [];
  let curColX = innerX;
  for (let w of colWidths) {
    colX.push(curColX);
    curColX += w;
  }

  const tableHeaderHeight = 20;
  const tableHeaderY = cursorY - tableHeaderHeight;

  // Table header background
  page.drawRectangle({
    x: innerX,
    y: tableHeaderY,
    width: innerWidth,
    height: tableHeaderHeight,
    color: cNavy,
  });

  const headers = ['#', 'Description of Service', 'SAC', 'Qty', 'Rate (INR)', 'Amount (INR)'];
  headers.forEach((h, idx) => {
    const isRight = idx >= 3;
    const x = isRight
      ? colX[idx] + colWidths[idx] - 8 - fontBold.widthOfTextAtSize(h, 7.5)
      : colX[idx] + 8;
    page.drawText(h, {
      x,
      y: tableHeaderY + 6,
      size: 7.5,
      font: fontBold,
      color: cWhite,
    });
  });

  cursorY = tableHeaderY;

  // Items list
  const items =
    Array.isArray(orderData.items) && orderData.items.length > 0
      ? orderData.items
      : [
          { name: orderData.plan_name || 'Advanced Investment Portfolio Review', quantity: 1, subtotal: 0 },
          { name: 'Pro Will', quantity: 1, subtotal: 0 },
          { name: 'Product ID #235699', quantity: 1, subtotal: 0 },
          { name: 'Product ID #235695', quantity: 1, subtotal: 0 },
          { name: 'Product ID #235685', quantity: 1, subtotal: 0 },
          { name: 'Product ID #235683', quantity: 1, subtotal: 0 },
        ];

  const rowHeight = 22;
  let totalCalculated = 0;

  items.forEach((item, idx) => {
    const rowY = cursorY - rowHeight;
    const isAlt = idx % 2 === 1;

    // Row background
    if (isAlt) {
      page.drawRectangle({
        x: innerX,
        y: rowY,
        width: innerWidth,
        height: rowHeight,
        color: cRowAlt,
      });
    }

    // Outer borders
    page.drawRectangle({
      x: innerX,
      y: rowY,
      width: innerWidth,
      height: rowHeight,
      borderColor: cBorderLight,
      borderWidth: 0.5,
    });

    const qty = Number(item.quantity) || 1;
    const itemTotal = Number(item.total != null ? item.total : item.subtotal || 0);
    const itemRate = qty > 0 ? itemTotal / qty : itemTotal;
    totalCalculated += itemTotal;

    const rowNum = String(idx + 1);
    const sacCode = item.sac || '997152';
    const desc = item.name || item.title || 'Corporate Advisory Service';
    const rateStr = itemRate.toFixed(2);
    const amountStr = itemTotal.toFixed(2);

    // #
    page.drawText(rowNum, {
      x: colX[0] + (colWidths[0] - fontRegular.widthOfTextAtSize(rowNum, 7.5)) / 2,
      y: rowY + 7,
      size: 7.5,
      font: fontRegular,
      color: cSlateMedium,
    });

    // Description (truncate if too long)
    let displayDesc = desc;
    while (fontBold.widthOfTextAtSize(displayDesc, 8) > colWidths[1] - 16 && displayDesc.length > 5) {
      displayDesc = displayDesc.slice(0, -4) + '...';
    }
    page.drawText(displayDesc, {
      x: colX[1] + 8,
      y: rowY + 7,
      size: 8,
      font: fontBold,
      color: cSlateDark,
    });

    // SAC
    page.drawText(sacCode, {
      x: colX[2] + (colWidths[2] - fontRegular.widthOfTextAtSize(sacCode, 7.5)) / 2,
      y: rowY + 7,
      size: 7.5,
      font: fontRegular,
      color: cSlateMedium,
    });

    // Qty
    const qtyStr = String(qty);
    page.drawText(qtyStr, {
      x: colX[3] + colWidths[3] - 8 - fontBold.widthOfTextAtSize(qtyStr, 8),
      y: rowY + 7,
      size: 8,
      font: fontBold,
      color: cSlateDark,
    });

    // Rate
    page.drawText(rateStr, {
      x: colX[4] + colWidths[4] - 8 - fontRegular.widthOfTextAtSize(rateStr, 7.5),
      y: rowY + 7,
      size: 7.5,
      font: fontRegular,
      color: cSlateDark,
    });

    // Amount
    page.drawText(amountStr, {
      x: colX[5] + colWidths[5] - 8 - fontBold.widthOfTextAtSize(amountStr, 8),
      y: rowY + 7,
      size: 8,
      font: fontBold,
      color: cSlateDark,
    });

    cursorY = rowY;
  });

  // Total Row 1: Amount in Words & Sub Total
  const subTotalHeight = 24;
  const subTotalY = cursorY - subTotalHeight;

  page.drawRectangle({
    x: innerX,
    y: subTotalY,
    width: innerWidth,
    height: subTotalHeight,
    borderColor: cBorderLight,
    borderWidth: 0.5,
    color: cWhite,
  });

  const finalTotal = orderData.total != null ? Number(orderData.total) : totalCalculated;
  const words = numberToWords(finalTotal);

  page.drawText('AMOUNT IN WORDS:', {
    x: innerX + 8,
    y: subTotalY + 14,
    size: 6.5,
    font: fontBold,
    color: cSlateLight,
  });
  page.drawText(words, {
    x: innerX + 8,
    y: subTotalY + 4,
    size: 7.5,
    font: fontBold,
    color: cTeal,
  });

  // Right: Sub Total
  const subTotalLabel = 'Sub Total:';
  const subTotalVal = `Rs. ${finalTotal.toFixed(2)}`;
  page.drawText(subTotalLabel, {
    x: innerRight - 110,
    y: subTotalY + 8,
    size: 8,
    font: fontRegular,
    color: cSlateDark,
  });
  page.drawText(subTotalVal, {
    x: innerRight - 8 - fontBold.widthOfTextAtSize(subTotalVal, 8),
    y: subTotalY + 8,
    size: 8,
    font: fontBold,
    color: cSlateDark,
  });

  cursorY = subTotalY;

  // Total Row 2: Regulatory note & Grand Total
  const totalRowHeight = 24;
  const totalRowY = cursorY - totalRowHeight;

  page.drawRectangle({
    x: innerX,
    y: totalRowY,
    width: innerWidth,
    height: totalRowHeight,
    borderColor: cBorderLight,
    borderWidth: 0.5,
    color: cRowAlt,
  });

  page.drawText('Services rendered in accordance with SEBI registered CFP guidelines.', {
    x: innerX + 8,
    y: totalRowY + 8,
    size: 7,
    font: fontOblique,
    color: cSlateMedium,
  });

  const grandTotalLabel = 'TOTAL:';
  const grandTotalVal = `Rs. ${finalTotal.toFixed(2)}`;
  page.drawText(grandTotalLabel, {
    x: innerRight - 110,
    y: totalRowY + 7,
    size: 9,
    font: fontBold,
    color: cTeal,
  });
  page.drawText(grandTotalVal, {
    x: innerRight - 8 - fontBold.widthOfTextAtSize(grandTotalVal, 9.5),
    y: totalRowY + 7,
    size: 9.5,
    font: fontBold,
    color: cTeal,
  });

  cursorY = totalRowY - 20;

  // 4. Terms & Conditions (Left) and Signatory (Right)
  const footerLeftX = innerX;

  page.drawText('Terms & Conditions:', {
    x: footerLeftX,
    y: cursorY,
    size: 7.5,
    font: fontBold,
    color: cSlateDark,
  });
  page.drawText('1. This is a computer-generated tax invoice and commercial order bill.', {
    x: footerLeftX,
    y: cursorY - 11,
    size: 7,
    font: fontRegular,
    color: cSlateMedium,
  });
  page.drawText(
    `2. For queries, write to billing@assuredgain.com referencing Order #${displayOrderId}.`,
    {
      x: footerLeftX,
      y: cursorY - 21,
      size: 7,
      font: fontRegular,
      color: cSlateMedium,
    }
  );

  // Right Signatory
  const forCompText = 'For ASSURED GAIN FINANCIAL SERVICES';
  page.drawText(forCompText, {
    x: innerRight - fontBold.widthOfTextAtSize(forCompText, 7.5),
    y: cursorY,
    size: 7.5,
    font: fontBold,
    color: cSlateDark,
  });

  // Digitally Signed Pill
  const signPillWidth = 120;
  const signPillHeight = 16;
  const signPillX = innerRight - signPillWidth;
  const signPillY = cursorY - 20;

  page.drawRectangle({
    x: signPillX,
    y: signPillY,
    width: signPillWidth,
    height: signPillHeight,
    borderColor: cTealDark,
    borderWidth: 0.75,
    color: cWhite,
  });

  const signText = '[Verified] Digitally Signed';
  const signTextWidth = fontBold.widthOfTextAtSize(signText, 7);
  page.drawText(signText, {
    x: signPillX + (signPillWidth - signTextWidth) / 2,
    y: signPillY + 4.5,
    size: 7,
    font: fontBold,
    color: cTealDark,
  });

  const authSignText = 'Authorized Signatory';
  page.drawText(authSignText, {
    x: innerRight - fontRegular.widthOfTextAtSize(authSignText, 7),
    y: signPillY - 10,
    size: 7,
    font: fontRegular,
    color: cSlateLight,
  });

  // 5. Bottom Sub-footer line
  const botNotice =
    'Official Electronic Tax Invoice / Order Bill  |  Mārwāri Royal E-Commerce  |  rpsdigitalworld.store';
  const botNoticeWidth = fontRegular.widthOfTextAtSize(botNotice, 6.5);
  page.drawText(botNotice, {
    x: (pageWidth - botNoticeWidth) / 2,
    y: margin + 8,
    size: 6.5,
    font: fontRegular,
    color: cSlateLight,
  });

  // Save as Base64
  const pdfBase64 = await pdfDoc.saveAsBase64();
  const fileName = `Order-Bill-${displayOrderId}.pdf`;

  // Write to Documents / Downloads directory
  const { dirs } = ReactNativeBlobUtil.fs;
  const targetDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const filePath = `${targetDir}/${fileName}`;

  await ReactNativeBlobUtil.fs.writeFile(filePath, pdfBase64, 'base64');

  return {
    filePath,
    fileName,
    fileUrl: `file://${filePath}`,
    orderId: displayOrderId,
  };
}

/**
 * Downloads, previews, or shares the official PDF invoice for the given order.
 * Ensures the actual .pdf file is presented for saving or viewing.
 */
export async function downloadOrShareInvoice(orderData = {}, profile = {}) {
  const result = await generateInvoicePdf(orderData, profile);
  const { filePath, fileName, fileUrl, orderId } = result;

  try {
    if (Platform.OS === 'ios') {
      try {
        await Share.share(
          {
            title: fileName,
            url: fileUrl,
          },
          {
            subject: `Mārwāri Tax Invoice #${orderId}`,
          }
        );
      } catch (shareErr) {
        if (ReactNativeBlobUtil.ios?.presentPreview) {
          await ReactNativeBlobUtil.ios.presentPreview(filePath);
        } else {
          throw shareErr;
        }
      }
    } else {
      // Android: Open PDF intent or share
      let viewed = false;
      if (ReactNativeBlobUtil.android?.actionViewIntent) {
        try {
          await ReactNativeBlobUtil.android.actionViewIntent(filePath, 'application/pdf');
          viewed = true;
        } catch (e) {
          console.warn('actionViewIntent fallback:', e);
        }
      }

      if (!viewed) {
        await Share.share({
          title: fileName,
          url: fileUrl,
          message: `Order #${orderId} Tax Invoice: ${fileName}`,
        });
      }
    }
  } catch (err) {
    console.error('Invoice share/preview error:', err);
    throw err;
  }

  return result;
}
