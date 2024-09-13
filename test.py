import json
from docx import Document

# Load the .docx file
doc = Document('test.docx')

# Initialize a list to hold table data
table_data = []

print(doc)
# Loop through each table in the document
for table in doc.tables:
    # Iterate over table rows
    for row in table.rows:
        row_data = {}
        # Iterate over cells in each row
        for idx, cell in enumerate(row.cells):
            row_data[f'column_{idx+1}'] = cell.text.strip()
        table_data.append(row_data)

# Save the extracted data to a JSON file
with open('table_data.json', 'w') as json_file:
    json.dump(table_data, json_file, indent=4)

# Output the result for review
print(json.dumps(table_data, indent=4))