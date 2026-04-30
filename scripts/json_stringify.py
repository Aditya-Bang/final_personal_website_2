#!/usr/bin/env python3
import argparse
import json
from pathlib import Path


DEFAULT_INPUT = Path(__file__).with_name("json_string_input.txt")
DEFAULT_OUTPUT = Path(__file__).with_name("json_string_output.txt")


def main():
    parser = argparse.ArgumentParser(
        description="Convert a text file into a JSON string literal."
    )
    parser.add_argument(
        "input_file",
        nargs="?",
        default=DEFAULT_INPUT,
        type=Path,
        help=f"Text file to convert. Defaults to {DEFAULT_INPUT}.",
    )
    parser.add_argument(
        "--key",
        help='Print a full JSON property, for example: --key code',
    )
    parser.add_argument(
        "--output-file",
        default=DEFAULT_OUTPUT,
        type=Path,
        help=f"File to write output to. Defaults to {DEFAULT_OUTPUT}.",
    )
    parser.add_argument(
        "--no-write",
        action="store_true",
        help="Only print output instead of also writing it to the output file.",
    )
    parser.add_argument(
        "--strip-final-newline",
        action="store_true",
        help="Remove one trailing newline from the input before converting.",
    )
    args = parser.parse_args()

    text = args.input_file.read_text()

    if args.strip_final_newline:
        text = text.removesuffix("\n")

    json_string = json.dumps(text)

    if args.key:
        output = f"{json.dumps(args.key)}: {json_string}"
    else:
        output = json_string

    print(output)

    if not args.no_write:
        args.output_file.write_text(f"{output}\n")
        print(f"\nWrote output to {args.output_file}")


if __name__ == "__main__":
    main()
