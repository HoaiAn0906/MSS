package org.mss.sampledata.service;

import org.mss.sampledata.utils.SqlScriptExecutor;
import org.mss.sampledata.viewmodel.SampleDataVm;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SampleDataService {
    private final DataSource productDataSource;
    private final DataSource mediaDataSource;

    @Autowired
    public SampleDataService(@Qualifier("productDataSource") DataSource productDataSource,
                     @Qualifier("mediaDataSource") DataSource mediaDataSource) {
        this.productDataSource = productDataSource;
        this.mediaDataSource = mediaDataSource;
    }

    public SampleDataVm createSampleData() {
        SqlScriptExecutor executor = new SqlScriptExecutor();
        executor.executeScriptsForSchema(productDataSource, "public", "classpath*:db/product/*.sql");
        executor.executeScriptsForSchema(mediaDataSource, "public", "classpath*:db/media/*.sql");
        return new SampleDataVm("Insert Sample Data successfully!");
    }
}
