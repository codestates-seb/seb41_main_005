package com.gigker.server.global.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class ExecutionTimer {

	// 조인포인트를 어노테이션으로 설정
	@Pointcut("@annotation(com.gigker.server.global.aop.ExeTimer)")
	private void timer(){};

	// 메서드 실행 전, 후로 시간 공유
	@Around("timer()")
	public void measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
		long startTime = System.currentTimeMillis();
		joinPoint.proceed(); // 조인포인트의 메서드 실행
		long endTime = System.currentTimeMillis();

		MethodSignature signature = (MethodSignature)joinPoint.getSignature();
		String methodName = signature.getMethod().getName();

		log.info("실행 메서드 : {}, 실행 시간 : {}ms", methodName, endTime - startTime);
	}
}
