package org.mss.commonlibrary.exception;

import org.mss.commonlibrary.utils.MessagesUtils;

public class DuplicatedException extends RuntimeException {

    private final String message;

    public DuplicatedException(String errorCode, Object... var2) {
        this.message = MessagesUtils.getMessage(errorCode, var2);
    }

    @Override
    public String getMessage() {
        return message;
    }
}
