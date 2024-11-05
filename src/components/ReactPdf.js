import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  header: {
    fontSize: "34",
    textAlign: "center",
    marginTop: "60px",
    marginBottom: "40px",
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
    borderRight: "1px solid black",
  },
  classSection: {
    width: "15%",
    borderRight: "1px solid black",
  },
  parentSection: {
    width: "30%",
    borderRight: "1px solid black",
  },
  disabilty: {
    marginLeft: 10,
    marginRight: 10,
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    border: "1px solid black",
    width: 25,
    height: 25,
    marginLeft: 30,
    marginRight: 10,
  },
  checkmark: {
    width: 14,
    height: 22,
    borderBottom: "2px solid black",
    borderRight: "2px solid black",
    transform: "rotateY(0deg) rotate(45deg)",
    marginLeft: 30,
    marginBottom: 12,
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
  areaSection: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  signature: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
});

const ReactPdf = ({
  firstName,
  lastName,
  year,
  className,
  teacher,
  dob,
  areas,
  isPhysical,
  isCognitive,
  isSocial,
  isSensory,
}) => {
  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.header}>
          <Text>Individualised Education Plan (IEP)</Text>
        </View>
        <View style={styles.personal}>
          <View style={styles.studentSection}>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              Student: {`${firstName} ${lastName}`}
            </Text>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              D.O.B: {dob}
            </Text>
            <Text style={{ padding: 4 }}>Class Teacher: {teacher}</Text>
          </View>
          <View style={styles.classSection}>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              Class: {className}
            </Text>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              Year: {year}
            </Text>
            <Text style={{ padding: 4 }}>Date: Date</Text>
          </View>
          <View style={styles.parentSection}>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              Parent/Caregiver:{" "}
            </Text>
            <Text style={{ padding: 4, borderBottom: "1px solid black" }}>
              Parent/Caregiver:{" "}
            </Text>
            <Text style={{ padding: 4 }}>Review date: </Text>
          </View>
          <View>
            <Text style={{ padding: 4 }}>Tools4Learning: </Text>
          </View>
        </View>
        <View style={styles.disabilty}>
          <View>
            <Text style={{ padding: 4 }}>Disability Category: </Text>
            <Text style={{ padding: 4 }}>(if applicable)</Text>
          </View>
          <View style={isPhysical ? styles.checkmark : styles.checkbox}></View>
          <Text>Physical</Text>
          <View style={isCognitive ? styles.checkmark : styles.checkbox}></View>
          <Text>Cognitive</Text>
          <View style={isSocial ? styles.checkmark : styles.checkbox}></View>
          <Text>Social/Emotional</Text>
          <View style={isSensory ? styles.checkmark : styles.checkbox}></View>
          <Text>Sensory</Text>
        </View>
        <View style={styles.descriptionSection}>
          <View style={{ width: "30%", borderRight: "1px solid black" }}>
            <Text
              style={{
                padding: 4,
                borderBottom: areas ? "none" : "1px solid black",
              }}
            >
              Area of Focus
            </Text>
            {!areas && <View style={{ height: 300 }}></View>}
          </View>
          <View style={{ width: "40%", borderRight: "1px solid black" }}>
            <Text
              style={{
                padding: 4,
                borderBottom: areas ? "none" : "1px solid black",
              }}
            >
              Strategies/Adjustments
            </Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text
              style={{
                padding: 4,
                borderBottom: areas ? "none" : "1px solid black",
              }}
            >
              Evaluation
            </Text>
          </View>
        </View>
        {areas &&
          Object.entries(areas).map(([area, strategies], index, array) => {
            const isLast = index === array.length - 1;
            return (
              <View key={area} style={styles.areaSection}>
                <View
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    borderBottom: isLast ? "1px solid black" : "none",
                  }}
                >
                  <Text style={{ padding: 4 }}>{area}</Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    borderRight: "1px solid black",
                    borderBottom: isLast ? "1px solid black" : "none",
                  }}
                >
                  {strategies.map((strategy) => (
                    <Text key={strategy} style={{ padding: 4 }}>
                      {strategy}
                    </Text>
                  ))}
                </View>
                <View
                  style={{
                    width: "30%",
                    borderBottom: isLast ? "1px solid black" : "none",
                  }}
                ></View>
              </View>
            );
          })}
        <View style={styles.signature}>
          <View style={{ width: "50%" }}>
            <Text>Classroom Teacher Signature</Text>
            <View
              style={{
                borderBottom: "1px solid black",
                height: 30,
                width: 300,
              }}
            ></View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ paddingTop: 10 }}>Date: </Text>
              <View
                style={{
                  borderBottom: "1px solid black",
                  height: 30,
                  width: 250,
                }}
              ></View>
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <Text>Parent/s Signature</Text>
            <View
              style={{
                borderBottom: "1px solid black",
                height: 30,
                width: 300,
              }}
            ></View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ paddingTop: 10 }}>Date: </Text>
              <View
                style={{
                  borderBottom: "1px solid black",
                  height: 30,
                  width: 250,
                }}
              ></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReactPdf;
