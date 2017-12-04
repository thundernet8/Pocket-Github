package com.pocketgithub;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

/**
 * Created by WXQ on 2017/12/4.
 */

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);

         Intent intent = new Intent(this, MainActivity.class);
         startActivity(intent);
         finish();
    }
}
