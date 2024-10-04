import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Stack, Typography, alpha, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardArrowDown } from "@mui/icons-material";

interface Props {
  options: { name: string | number; value: string | number }[];
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
}

export default function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
  disabled,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuItemClick = (index: number) => {
    onChange(options[index].value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "4px",
          backgroundColor: "#fff",
          border: "1px solid #CDD0D5",
          width: "100%",
          height: "66px",
          padding: "12px",
          cursor: disabled ? "arrow" : "pointer",
          borderColor: anchorEl ? "primary.main" : "",
          borderWidth: anchorEl ? "2px" : "",
          boxShadow: anchorEl
            ? `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
            : "inset 0 1px 1px rgb(0 0 0 / 8%)",
          display: "flex",
          alignItems: "center",
        }}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickListItem}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            sx={{
              fontSize: "15px",
              lineHeight: "1.42857143",
              color: "grey",
              opacity: value && !disabled ? 1 : 0.6,
            }}
          >
            {options.find((option) => option.value === value)?.name ||
              placeholder ||
              ""}
          </Typography>
          <KeyboardArrowDown
            sx={{ color: "primary.main", fontWeight: "bold" }}
          />
        </Stack>
      </Box>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
          style: {
            width: "100%",
          },
        }}
      >
        <MenuItem
          selected={value === ""}
          onClick={() => {
            onChange("");
            setAnchorEl(null);
          }}
          sx={{ width: "100%", fontSize: "12px" }}
        >
          {placeholder || ""}
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            key={option.name}
            // disabled={index === 0}
            selected={option.value === value}
            onClick={() => handleMenuItemClick(index)}
            sx={{ width: "100%" }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
