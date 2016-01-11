import json

atoms = []
with open("pdb2rh1.ent") as pdbfile:
	for line in pdbfile:
		if line.startswith("ATOM"):
			split = line.split()
			atoms.append({
				"x": split[6],
				"y": split[7],
				"z": split[8],
				"element": split[-1]
			})

with open("pdb.json", 'w') as jsonfile:
	jsonfile.write(json.dumps(atoms))
