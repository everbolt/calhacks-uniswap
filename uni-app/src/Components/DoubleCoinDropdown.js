import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { token_names } from "./Data/token_names";
import BasicSelect from "./Dropdown";

function DoubleDropdown(prop) {
  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <BasicSelect tokens={Object.values(token_names)} />
        </Grid>
        <Grid item>
          <BasicSelect tokens={Object.values(token_names)} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DoubleDropdown