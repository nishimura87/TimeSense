<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'progress' => 'sometimes|required|integer',
            'due_date' => 'sometimes|nullable|date',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'タスク',
            'progress' => '進捗',
            'due_date' => '期日', 
        ];
    }
}
