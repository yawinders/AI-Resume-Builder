import { useToast } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadResumeAsPDF = async (resumeRef, loading, setLoading) => {
    // const toast = useToast()
    setLoading(true)
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better clarity
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF Dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Image dimensions
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let yPosition = 0; // Start position

    // If image height is larger than PDF page, we need to split into multiple pages
    while (yPosition < imgHeight) {
        pdf.addImage(imgData, "PNG", 0, yPosition * -1, imgWidth, imgHeight);
        yPosition += pdfHeight; // Move to next page
        if (yPosition < imgHeight) pdf.addPage(); // Add new page if needed
    }
    setLoading(false)
    // toast({
    //     title: "Download Successfully",

    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-right"

    // })

    pdf.save("resume.pdf");
};