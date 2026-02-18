type TableRow = Record<string, any>;

export const printTable = (rows: TableRow[]) => {
  if (!rows || rows.length === 0) {
    console.log("No data to display.");
    return;
  }

  console.table(rows);
};
