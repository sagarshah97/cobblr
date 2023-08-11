//Author: Ashish Ojha (B00931967)
import React, { useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const InvoiceCard = ({ orderDetails }) => {
  const cardRef = useRef(null);

  const handleDownloadInvoice = () => {
    const cardElement = cardRef.current;
    const iconElement = cardElement.querySelector(".download-icon");
    if (iconElement) {
      iconElement.style.visibility = "hidden";
    }

    html2canvas(cardElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 277);
      pdf.save("invoice.pdf");
      if (iconElement) {
        iconElement.style.visibility = "visible";
      }
    });
  };

  return (
    <Card ref={cardRef}>
      <CardContent>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <IconButton
            aria-label="Download Invoice"
            color="primary"
            onClick={handleDownloadInvoice}
            className="download-icon"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <GetAppIcon />
          </IconButton>
        </div>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Typography variant="h6" color="black">
            Cobblr
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="h6" color="textPrimary">
              Invoice
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Invoice Number: {orderDetails?.invoiceNumber}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Invoice Date: {orderDetails?.date}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Invoice Time: {orderDetails?.time}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Address: {orderDetails?.address}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Contact Number: {orderDetails?.phone}
            </Typography>
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails?.items?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Subtotal
                </TableCell>
                <TableCell align="right">{orderDetails?.subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Tax
                </TableCell>
                <TableCell align="right">{orderDetails?.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell align="right">{orderDetails?.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
