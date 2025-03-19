package org.mss.commonlibrary.csv;

import org.mss.commonlibrary.csv.anotation.CsvColumn;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
public class BaseCsv {
    @CsvColumn(columnName = "Id")
    private Long id;
}
