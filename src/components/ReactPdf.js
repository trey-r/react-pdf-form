import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    fontWeight: "bold"
  },
  header: {
    fontSize: "34",
    textAlign: "center",
    marginTop: "60px",
    marginBottom: "40px"
  },
  personal: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
  },
  studentSection: {
    width: "25%",
    borderRight: "1px solid black"
  },
  classSection: {
    width: "15%",
    borderRight: "1px solid black"
  },
  parentSection: {
    width: "30%",
    borderRight: "1px solid black"
  },
  disabilty: {
    marginLeft: 10,
    marginRight: 10,
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    border: "1px solid black",
    width: 25,
    height: 25,
    marginLeft: 30,
    marginRight: 10
  },
  descriptionSection: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
  },
  signature: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  }
});

const ReactPdf = ({ firstName }) => (
  <Document>
    <Page size="A3" style={styles.page}>
      <View style={styles.header}>
        <Text>Individualised Education Plan (IEP)</Text>
      </View>
      <View style={styles.personal}>
        <View style={styles.studentSection}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Student: </Text>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>D.O.B: </Text>
            <Text style={{padding:4}}>Class Teacher: </Text>
        </View>
        <View style={styles.classSection}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Class: </Text>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Year: </Text>
            <Text style={{padding:4}}>Date: Date</Text>
        </View>
        <View style={styles.parentSection}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Parent/Caregiver: </Text>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Parent/Caregiver: </Text>
            <Text style={{padding:4}}>Review date: </Text>
        </View>
        <View>
            <Text style={{padding:4}}>Tools4Learning: </Text>
        </View>
      </View>
      <View style={styles.disabilty}>
        <View>
            <Text style={{padding:4}}>Disability Category: </Text>
            <Text style={{padding:4}}>(if applicable)</Text>
        </View>
        <View style={styles.checkbox}></View>
        <Text>Physical</Text>
        <View style={styles.checkbox}></View>
        <Text>Cognitive</Text>
        <View style={styles.checkbox}></View>
        <Text>Social/Emotional</Text>
        <View style={styles.checkbox}></View>
        <Text>Sensory</Text>
      </View>
      <View style={styles.descriptionSection}>
        <View style={{width: "30%", borderRight: "1px solid black"}}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Area of Focus</Text>
            <View style={{height: 500}}></View>
        </View>
        <View style={{width: "40%", borderRight: "1px solid black"}}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Strategies/Adjustments</Text>
            <View style={{height: 500}}></View>
        </View>
        <View style={{width: "30%"}}>
            <Text style={{padding:4, borderBottom: "1px solid black"}}>Evaluation</Text>
            <View style={{height: 500}}></View>
        </View>
      </View>
      <View style={styles.signature}>
        <View style={{width: "50%"}}>
            <Text>Classroom Teacher Signature</Text>
            <View style={{borderBottom: "1px solid black", height: 30, width: 300}}></View>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={{paddingTop: 10}}>Date: </Text>
                <View style={{borderBottom: "1px solid black", height: 30, width: 250}}></View>
            </View>
        </View>
        <View style={{width: "50%"}}>
            <Text>Parent/s Signature</Text>
            <View style={{borderBottom: "1px solid black", height: 30, width: 300}}></View>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={{paddingTop: 10}}>Date: </Text>
                <View style={{borderBottom: "1px solid black", height: 30, width: 250}}></View>
            </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ReactPdf;
